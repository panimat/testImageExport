import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from '@sheet/imagedemo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testtest';

  @ViewChild('TABLE', { static: false}) table: ElementRef;

  ExportTOExcel() {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement, { cellStyles: true, borders: true, bookImages: true });
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      ws['!images'] = [];
      var imdata = require('../assets/android-icon-192x192.png'); // "data:image/png:base64,..."
      //const imdata = fs.readFileSync('../assets/android-icon-192x192.png', "base64");

      console.log("IMDATA");
      console.log(imdata);

      ws['!images'].push({
          '!pos': {x: 0, y: 0, w: 370, h: 90},
          '!datatype': 'base64',
          '!data': imdata
      });
      /* save to file */
      XLSX.writeFile(wb, 'SheetJS.xlsx', { cellStyles: true, bookImages: true, bookSST: true });
  }

  private base64textString:String="";
  
  handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
            console.log(btoa(binaryString));
    }
}