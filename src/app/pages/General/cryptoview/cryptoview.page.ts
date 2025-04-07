import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';
import { Subscription, timer } from 'rxjs';
import { BackgraphbuttonDirective } from 'src/app/core/directives/backgraphbutton.directive';
import { AdvancedCrypto, BasicCrypto, CryptoGraphPrice } from 'src/app/core/models/Crypto.model';
import { CurrencyPipe } from 'src/app/core/pipes/currency.pipe';
import { AUTH_TOKEN, CRYPTO_SERVICE_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { TranslationService } from 'src/app/core/services/impl/translation.service';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { ICryptobaseService } from 'src/app/core/services/interfaces/crypto/Crypto-base-service.interface';

Chart.register(...registerables); // Registra los componentes de Chart.js

@Component({
  selector: 'app-cryptoview',
  templateUrl: './cryptoview.page.html',
  styleUrls: ['./cryptoview.page.scss'],
  providers:[CurrencyPipe,BackgraphbuttonDirective],
})
export class CryptoviewPage implements OnInit {


  id:string=""
  currency:string="eur"
  crypto:AdvancedCrypto={id:'',name:'',symbol:'',image:'',currentPrice:0}
  days:number=1
  percent:number=0;
  public chart: any;
  private suscriptions: Subscription[] = [];
  constructor(
    private currencypipe:CurrencyPipe,
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
    private activateroute:ActivatedRoute,
    @Inject(CRYPTO_SERVICE_TOKEN) private cryptoservice:ICryptobaseService<any>,
    private translate: TranslateService,
    private translation: TranslationService,
    private alertcontroller:AlertController

  ) { 
    

  }

  updatechart(number:number) {
    this.days=number
    let list:number[]=[]
    let list2: number[]=[]
    this.suscriptions.push(this.cryptoservice.getPriceList(this.id,this.currency,number+"").subscribe({
      next:(value)=>{
          let valuexd=value as CryptoGraphPrice[]
          list=valuexd.map(c=>c.price)
          list2=valuexd.map(c=>c.date)
          let date=list2.map(c=>{
            let date= new Date(c)
            const day = String(date.getDate()).padStart(2, '0');  // esto extrae el dia con 2 digitos
            const month = String(date.getMonth() + 1).padStart(2, '0');  // esto extrae el mes con 2 digitos
            const year = date.getFullYear();  // esto va a extraer el año completo
            const hours = String(date.getHours()).padStart(2, '0'); // esto extrae las horas
            const minutes = String(date.getMinutes()).padStart(2, '0'); // esto extrae el minuto

            if(this.days<8){
              return ""+day+"/"+month+"/"+year+" "+hours+":"+minutes
            }else{
              return ""+day+"/"+month+"/"+year+""
            }
          })
          this.chart.data.labels=date
          this.chart.data.datasets[0].data=list
          this.percent=((list[list.length-1]*100/list[0])-100)
          this.chart.update()
      },
    }))
    
  }

  ionViewWillEnter(){

    this.authservice.setmenu(true)

    this.suscriptions.push(this.activateroute.paramMap.subscribe(params=>{
      this.id=params.get('id')??"bitcoin"
      this.currency=params.get('currency')??"eur"
    }))

    if (this.chart) {
      this.chart.destroy();
      console.log('Gráfico destruido al entrar en la vista');
    }

    this.getdatacrypto()

    
    
    this.createchart()
    

  }

  getdatacrypto(){
    this.suscriptions.push(this.cryptoservice.findbyId(this.id,this.currency).subscribe({
      next:(value)=>{
          this.crypto=value[0]
      },
    }))
  }

  createchart(){
    console.log(this.days)
    let list:number[]=[]
    let list2:number[]=[]
    let date:string[]=[]
    this.suscriptions.push(this.cryptoservice.getPriceList(this.id,this.currency,"1").subscribe({
      next:(value)=>{
          let valuexd=value as CryptoGraphPrice[]
          list=valuexd.map(c=>c.price)
          list2=valuexd.map(c=>c.date)
          date=list2.map(c=>{
            let date= new Date(c)
            const day = String(date.getDate()).padStart(2, '0');  // esto extra el dia con 2 digitos
            const month = String(date.getMonth() + 1).padStart(2, '0');  // esto extrae el mes con 2 digitos
            const year = date.getFullYear();  // esto va a extraer el año completo
            const hours = String(date.getHours()).padStart(2, '0'); // esto extrae las horas
            const minutes = String(date.getMinutes()).padStart(2, '0'); // esto extrae el minuto
            
            if(this.days<8){
              return ""+day+"/"+month+"/"+year+" "+hours+":"+minutes
            }else{
              return ""+day+"/"+month+"/"+year+""
            }

          })
          
          //para calcular el porcentaje
          this.percent=((list[list.length-1]*100/list[0])-100)

          this.createWaveChart(list,date);

      },
    }))
  }

  //cuando se salga de la vista elimina la gráfica para que al meterte en otra se construya bien de 0
  ionViewWillLeave() {
    if (this.chart) {
        this.chart.destroy();
        console.log('Gráfico destruido al salir de la vista (Ionic)');
    }
    ( < HTMLCanvasElement > document.getElementById('waveChart')).remove();

  }
  

  ngOnInit() {
    
    
  }

  
  createWaveChart(list: number[], list2: string[]) {
   
    
    let canvas = document.getElementById('waveChart') as HTMLCanvasElement;
    if (!canvas) {
      //se crea si se habia eliminado previamente
      canvas = document.createElement('canvas');
      canvas.id = 'waveChart'; 
      document.getElementById('chartcontainer')?.appendChild(canvas); 
    }
  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not found!');
      return;
    }
    
  
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: list2,
        datasets: [
          {
            label: '', //Precio de Criptomoneda
            data: list,
            borderColor: '#4caf50', // Verde elegante
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            backgroundColor: 'rgba(76, 175, 80, 0.2)', // Relleno suave
            pointRadius: 0, // Oculta los puntos por defecto
            pointHoverRadius: 6, // Tamaño del punto al interactuar
            pointBackgroundColor: '#ffffff', // Color del punto interactivo
            pointBorderColor: '#4caf50', // Color del borde del punto interactivo
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Permite ajustar al contenedor
        plugins: {
          legend: {
            display: false,
            position: 'top', // Leyenda en la parte superior
            labels: {
              font: {
                size: 14,
                family: 'Arial, sans-serif',
                weight: 'bold',
              },
              color: '#333', // Color de texto
            },
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            mode: 'nearest', // Muestra información del punto más cercano
            intersect: false, // Permite activar entre puntos
            callbacks: {
              label: this.formatTooltipLabel.bind(this),
              
            },
          },
        },
        interaction: {
          mode: 'nearest', // Detecta el punto más cercano
          intersect: false, // Interactúa incluso si está entre puntos
          axis: 'x', // Asegura que se active solo en el eje X
        },
        scales: {
          x: {
            title: {
              display: false,
              text: 'Fecha', // Título del eje X
              color: '#666',
              font: {
                size: 16,
                family: 'Arial, sans-serif',
              },
            },
            grid: {
              display: false, // Oculta líneas de la cuadrícula
            },
            ticks: {
              color: '#666',
            },
          },
          y: {
            title: {
              display: false,
              text: 'Precio ($)', // Título del eje Y //Precio ($)
              color: '#666',
              font: {
                size: 16,
                family: 'Arial, sans-serif',
              },
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)', // Líneas suaves
            },
            ticks: {
              color: '#666',
            },
          },
        },
      },
      plugins: [
        {
          id: 'verticalLine', // Nombre del plugin
          afterDraw: (chart) => {
            const tooltip = chart.tooltip;
            if (tooltip && tooltip.getActiveElements().length) {
              const ctx = chart.ctx;
        
              // Obtiene el elemento activo y su posición en el eje X
              const activeElement = tooltip.getActiveElements()[0];
              const x = activeElement.element.x;
        
              // Obtiene los límites del eje Y
              const yTop = chart.scales['y'].top;
              const yBottom = chart.scales['y'].bottom;
        
              // Dibuja la línea vertical
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(x, yTop); // Inicio de la línea
              ctx.lineTo(x, yBottom); // Fin de la línea
              ctx.lineWidth = 1; // Grosor de la línea
              ctx.strokeStyle = '#00eaff'; // Color de la línea (gris claro)
              ctx.stroke();
              ctx.restore();
            }
          },
        }
      ],
      
    });
    
    
    
  }
  
  //para desuscribirse de todos los observables
  ngOnDestroy(){
    this.suscriptions.forEach(c=>{
      c.unsubscribe()
    })
  }
  
  formatTooltipLabel(tooltipItem: any): string {
    let number = tooltipItem.raw.toFixed(5);
    let currencysymbol=this.currencypipe.transform(this.currency)
    return `${number} ${currencysymbol}`;
  }
  

  
  async changecurrency(){
    const alert = await this.alertcontroller.create({
      header: this.translate.instant('CRYPTOVIEW.SELECTCURRENCY'), 
      inputs: [
        {
          name: 'language',
          type: 'radio',
          label: this.translate.instant('CURRENCY.DOLLAR')+" ($)",
          value: 'usd', 
          checked: this.currency === 'usd', 
        },
        {
          name: 'language',
          type: 'radio',
          label: this.translate.instant('CURRENCY.EURO')+" (€)",
          value: 'eur', 
          checked: this.currency === 'eur',
        },
        {
          name: 'language',
          type: 'radio',
          label: this.translate.instant('CURRENCY.LIBRA')+" (£)",
          value: 'gbp', 
          checked: this.currency === 'gbp',
        }
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'), 
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.SAVE'),
          handler: (data) => {
            if (data) {
              if(data!=this.currency){
                this.crypto={id:'',name:'',symbol:'',image:'',currentPrice:0}
                this.currency=data
                this.getdatacrypto()
                this.updatechart(this.days)
              }
            }
          },
        },
      ],
    });

    await alert.present();
  }
  

}
