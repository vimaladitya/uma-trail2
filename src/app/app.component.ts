import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Observable, from } from 'rxjs';
import { DecimalPipe } from '@angular/common';

import { Table } from './advanced.model';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';


import { tableData } from './data';
import { AdvancedService } from './advanced.service';
import { AdvancedSortableDirective, SortEvent } from './advanced-sortable.directive';
// const tableData =[];
// export{tableData};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AdvancedService, DecimalPipe]

})

export class AppComponent implements OnInit {

  // bread crum data
  breadCrumbItems: Array<{}>;

  // Table data
  tableData: Table[];

  tables$: Observable<Table[]>;
  total$: Observable<number>;

  @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;

  constructor(private http: HttpClient, public service: AdvancedService) {
    this.tables$ = this.service.tables$;
    this.total$ = this.service.total$;
  }
  ngOnInit() {
    this._fetchData();
    this.tableData = tableData;

    // this.breadCrumbItems = [{ label: 'Tableasdfs' }, { label: 'Advanceasdfd Table', active: true }];

    /**
     * fetch data
     */
    setInterval(()=>{
      this._fetchData();
    },2000)
    
  }


  /**
   * fetches the table value
   */
  _fetchData() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    var dateNow: Date = new Date();
    var date = new Date()
    // console.log(date);

    // console.log(dateNowISO);
    this.http.post<Table>('https://nameless-hamlet-83858.herokuapp.com/api/messages/fetchMessage', {}).subscribe(posts => {

      var result = JSON.stringify(posts['message'])
      result = JSON.parse(result);
      this.tableData = posts['message'];
      console.log(this.tableData);
      //this.service.next(this.tableData);



      //this.databaseData = posts['message'];
      console.log(posts['message']);

      //   for (let value of Object.values(result)) {
      //  //  console.log("postreq"+(value['vid']))      
      //     ///ITEM
      //     this.aDescription = result["A"];
      //     this.bDescription = result["B"];
      //     this.aTime =(result["Atime"]).toString().replace("T"," ").replace(".000Z"," ");
      //     this.bTime =(result["Btime"]).toString().replace("T"," ").replace(".000Z"," ");
      //     this.tripDate = new Date(result["Atime"]).toLocaleDateString().toString();
      //     this.tripDuration = result["duration"];
      //     this.maxspeed = result['maxspeed']+" KMPH";
      //     this.maxrpm = result['maxrpm']+ " RPM";
      //     this.distance = result['distance'];
      //     this.distance =  parseFloat(this.distance).toFixed(1) +" KM";
      //     this.polyline =  result['polyline'];
      //console.log(result['A']);distance
      //  }

    })

  }

  myFunc() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAAMoZajM4:APA91bEpkn5FU5TYN6EDRZCPtDBcGtzpq4bdaz9DxJPvvoXRQ4nseiMXgAx4019hOT6Xz_-GGdS_1FzjAqfx-bgJ1ts_fYz6hNLNrYs-GNI_hQ1SbijHMnfImHk8dTfKEkbXNrPyt1uv'
      })
    };
    var dateNow: Date = new Date();
    var date = new Date()
    // console.log(date);

    // console.log(dateNowISO);
    this.http.post('https://fcm.googleapis.com/fcm/send', {
      "notification": {
        "title": "Fall detected",
        "body": "UMA device has triggered a fall detection !!"
      },
      "to": "ftEOtBvPnYA:APA91bEFmPA_cCyYFV8emQqje0gGGWdNohHMjNksNKYRfsTc5maPt4aC-714JMp4JEwWPh0hzftYu9giVcrYk4rfCzRe7Oi0d3yj4Kv7aFtoAYzSGURYJNAqX9QoAY1F3i2sG6f72Yiy"
    }, httpOptions).subscribe(posts => {

      console.log(posts);
      this.addMessageToDatabase();

    })
  }
  addMessageToDatabase() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    var dateNow: Date = new Date();
    var date = new Date()
    // console.log(date);

    // console.log(dateNowISO);
    this.http.post('https://nameless-hamlet-83858.herokuapp.com/api/messages/addMessage', {
      "id": "server",
      "title": "Fall detected",
      "description": "UMA device has triggered a fall detection !!",
      "timestamp": new Date().toString()
    }).subscribe(posts => {

      console.log(posts);


    })
  }


  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }





  // _fetchData() {

  //   this.tableData = tableData;

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/x-www-form-urlencoded',

  //   })};
  //   var dateNow : Date = new Date();
  //   var date = new Date()
  //   console.log(date);

  //  // console.log(dateNowISO);
  //   this.http.post('http://localhost:3001/recentTrip',{"vid":"TS07FV8324","time":new Date().toLocaleDateString}).subscribe(posts=>{

  //     var result = JSON.stringify(posts['data'])
  //     result = JSON.parse(result);

  //     //




  //     console.log(result);
  //     for (let value of Object.values(result)) {
  //    //  console.log("postreq"+(value['vid']))      
  //       ///ITEM
  //       this.aDescription = result["A"];
  //       this.bDescription = result["B"];
  //       this.aTime =(result["Atime"]).toString().replace("T"," ").replace(".000Z"," ");
  //       this.bTime =(result["Btime"]).toString().replace("T"," ").replace(".000Z"," ");
  //       this.tripDate = new Date(result["Atime"]).toLocaleDateString().toString();
  //       this.tripDuration = result["duration"];
  //       this.maxspeed = result['maxspeed']+" KMPH";
  //       this.maxrpm = result['maxrpm']+ " RPM";
  //       this.distance = result['distance'];
  //       this.distance =  parseFloat(this.distance).toFixed(1) +" KM";
  //       this.polyline =  result['polyline'];
  //       //console.log(result['A']);distance
  //     }

  //   })

  // }

}
