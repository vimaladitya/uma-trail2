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

    var data_UUID =this.uuidv4();
    var data_TimeSTAMP = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}).toString();
    // console.log(date);

    // console.log(dateNowISO);
    this.http.post('https://fcm.googleapis.com/fcm/send', {
      "data": {
        "title": "Jörgen Jonsson has fallen",
        "body": "Please attend the case. !",
        "timestamp":data_TimeSTAMP,
        "notificationId":data_UUID,
        "notificationStatus":"no"
      },
      "to":"cLxpMZHBTXaUd7Js8cm7Bd:APA91bE4H0SP0ptTo0CuVFh3t9nj57MMjRB25uKP3F98X2vJqrNDab4j8lF1lWgesTpfHoqGjmo6Ot0Dg-_rVrc12bmRvKre66Vu3NzrBIwS_h-vgJHlYWIASiWpJMNZpBr8I_Slyl0b"// new s8
    }, httpOptions).subscribe(posts => {

      console.log(posts);
      this.addMessageToDatabase(data_TimeSTAMP,data_UUID);

    })
  }
  addMessageToDatabase( time,UUID) {
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
      "id": "Jörgen Jonsson",
      "title": "Jörgen Jonsson has fallen",
      "description": "Please attend the case. !",
      "timestamp": time,
      "notificationId": UUID,
      "notificationStatus": "no"
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


   uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
