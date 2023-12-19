import { PhotoService, UserPhoto } from './../services/photo.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-capacitor',
  templateUrl: './capacitor.page.html',
  styleUrls: ['./capacitor.page.scss'],
})
export class CapacitorPage implements OnInit {
  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController
  ) {}

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  readFile!: string | Blob;
  writeFile!: string | Blob;

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePicture(photo, position);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          },
        },
      ],
    });
    await actionSheet.present();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async readSecretFile() {
    const readFile = await this.photoService.readSecretFile();
    this.readFile = readFile.data;
  }
  async writeSecretFile() {
    const writeFile = await this.photoService.writeSecretFile();
    this.writeFile = writeFile.uri;
  }
}
