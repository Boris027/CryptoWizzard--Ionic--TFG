import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { BackgraphbuttonDirective } from 'src/app/core/directives/backgraphbutton.directive';
import { AdvancedCrypto, CryptoGraphPrice } from 'src/app/core/models/Crypto.model';
import { CurrencyPipe } from 'src/app/core/pipes/currency.pipe';
import { AUTH_TOKEN, CRYPTO_SERVICE_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { TranslationService } from 'src/app/core/services/impl/translation.service';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { ICryptobaseService } from 'src/app/core/services/interfaces/crypto/Crypto-base-service.interface';

Chart.register(...registerables);

/**
 * CryptoviewPage component.
 * 
 * Displays detailed cryptocurrency information and a price history chart.
 * Supports changing currency display and time range for the price data.
 */
@Component({
  selector: 'app-cryptoview',
  templateUrl: './cryptoview.page.html',
  styleUrls: ['./cryptoview.page.scss'],
  providers:[CurrencyPipe,BackgraphbuttonDirective],
})
export class CryptoviewPage {
  id:string=""
  currency:string="eur"
  crypto:AdvancedCrypto={id:'',name:'',symbol:'',image:'',currentPrice:0}
  days:number=1
  percent:number=0;
  public chart: any;
  private suscriptions: Subscription[] = [];

  /**
   * Creates an instance of CryptoviewPage.
   * @param currencypipe Pipe to format currency symbols.
   * @param authservice Authentication service.
   * @param activateroute Provides access to route parameters.
   * @param cryptoservice Service to fetch crypto data.
   * @param translate Translation service for i18n.
   * @param translation Custom translation helper service.
   * @param alertcontroller Ionic AlertController for dialogs.
   */
  constructor(
    private currencypipe:CurrencyPipe,
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
    private activateroute:ActivatedRoute,
    @Inject(CRYPTO_SERVICE_TOKEN) private cryptoservice:ICryptobaseService<any>,
    private translate: TranslateService,
    private translation: TranslationService,
    private alertcontroller:AlertController
  ) { }

  /**
   * Updates the price chart based on the selected number of days.
   * @param number Number of days to display.
   */
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
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
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

  /**
   * Lifecycle hook: called when the page is about to enter and become active.
   * Sets menu state, reads route parameters, initializes chart and data.
   */
  ionViewWillEnter(){
    this.authservice.setmenu(true)
    this.suscriptions.push(this.activateroute.paramMap.subscribe(params=>{
      this.id=params.get('id')??"bitcoin"
      this.currency=params.get('currency')??"eur"
    }))
    if (this.chart) {
      this.chart.destroy();
    }
    this.getdatacrypto()
    this.createchart()
  }

  /**
   * Fetches cryptocurrency details by id and currency.
   */
  getdatacrypto(){
    this.suscriptions.push(this.cryptoservice.findbyId(this.id,this.currency).subscribe({
      next:(value)=>{
        this.crypto=value[0]
      },
    }))
  }

  /**
   * Creates the initial Chart.js line chart with price data for 1 day.
   */
  createchart(){
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
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            
            if(this.days<8){
              return ""+day+"/"+month+"/"+year+" "+hours+":"+minutes
            }else{
              return ""+day+"/"+month+"/"+year+""
            }
          })
          this.percent=((list[list.length-1]*100/list[0])-100)
          this.createWaveChart(list,date);
      },
    }))
  }

  /**
   * Lifecycle hook: called when the page is about to leave.
   * Cleans up the chart and removes the canvas element.
   */
  ionViewWillLeave() {
    if (this.chart) {
        this.chart.destroy();
    }
    ( < HTMLCanvasElement > document.getElementById('waveChart')).remove();
  }

  /**
   * Creates a Chart.js line chart displaying the price data.
   * @param list Array of prices.
   * @param list2 Array of formatted date strings.
   */
  createWaveChart(list: number[], list2: string[]) {
    let canvas = document.getElementById('waveChart') as HTMLCanvasElement;
    if (!canvas) {
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
            label: '',
            data: list,
            borderColor: '#4caf50',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            pointRadius: 0,
            pointHoverRadius: 6,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#4caf50',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: 'top',
            labels: {
              font: {
                size: 14,
                family: 'Arial, sans-serif',
                weight: 'bold',
              },
              color: '#333',
            },
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            mode: 'nearest',
            intersect: false,
            callbacks: {
              label: this.formatTooltipLabel.bind(this),
              
            },
          },
        },
        interaction: {
          mode: 'nearest',
          intersect: false,
          axis: 'x',
        },
        scales: {
          x: {
            title: {
              display: false,
              text: 'Fecha',
              color: '#666',
              font: {
                size: 16,
                family: 'Arial, sans-serif',
              },
            },
            grid: {
              display: false,
            },
            ticks: {
              color: '#666',
            },
          },
          y: {
            title: {
              display: false,
              text: 'Precio ($)',
              color: '#666',
              font: {
                size: 16,
                family: 'Arial, sans-serif',
              },
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)',
            },
            ticks: {
              color: '#666',
            },
          },
        },
      },
      plugins: [
        {
          id: 'verticalLine',
          afterDraw: (chart) => {
            const tooltip = chart.tooltip;
            if (tooltip && tooltip.getActiveElements().length) {
              const ctx = chart.ctx;
              
              const activeElement = tooltip.getActiveElements()[0];
              const x = activeElement.element.x;
              
              const yTop = chart.scales['y'].top;
              const yBottom = chart.scales['y'].bottom;
              
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(x, yTop);
              ctx.lineTo(x, yBottom);
              ctx.lineWidth = 1;
              ctx.strokeStyle = '#00eaff';
              ctx.stroke();
              ctx.restore();
            }
          },
        }
      ],
    });
  }

  /**
   * Lifecycle hook: called when the component is destroyed.
   * Unsubscribes all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(){
    this.suscriptions.forEach(c=>{
      c.unsubscribe()
    })
  }

  /**
   * Formats the tooltip label in the chart.
   * @param tooltipItem Tooltip item from Chart.js.
   * @returns Formatted string with price and currency symbol.
   */
  formatTooltipLabel(tooltipItem: any): string {
    let number = tooltipItem.raw.toFixed(5);
    let currencysymbol=this.currencypipe.transform(this.currency)
    return `${number} ${currencysymbol}`;
  }

  /**
   * Opens an alert to allow the user to change the displayed currency.
   * Updates the crypto data and chart accordingly.
   */
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