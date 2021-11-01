import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { ToastController,NavController,Platform,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})

export class ContactPage implements OnInit {

  data:any;
  text:any;
  constructor(private route: ActivatedRoute,public server : ServerService,public toastController: ToastController,private nav: NavController,public loadingController: LoadingController){

    this.text = JSON.parse(localStorage.getItem('app_text'));
    

  }

  ngOnInit()
  {
  	this.loadData();
  }

  async loadData()
  {
  	const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 3000
    });
    await loading.present();

  	loading.dismiss();

  }

  async send(data){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 3000
    });
    await loading.present();

    this.server.sendMessage(data).subscribe((response:any) => {
  
      if(response.data){
        this.presentToast(response.msg);
        this.nav.back();
      }
      else{
        this.presentToast(response.error);
      }

    });

    loading.dismiss();
  }

  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 3000,
      position : 'top',
      mode:'ios',
      color:'dark'
    });
    toast.present();
  }
}
