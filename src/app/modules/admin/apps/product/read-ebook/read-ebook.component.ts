import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ePub from 'epubjs';
import { BookEdit } from '../productModel/BookEdit';
@Component({
  selector: 'app-read-ebook',
  templateUrl: './read-ebook.component.html',
  styleUrls: ['./read-ebook.component.scss']
})
export class ReadEbookComponent implements OnInit {
  public rendition:any;
  public displayed:number=0;
  public ebook:BookEdit;
public ebookid:number;
  constructor(private Aroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ebook= new BookEdit();
    this.Aroute.params.subscribe(params => {
      this.ebookid=params['id'];
      localStorage.setItem('ebookid',JSON.stringify(this.ebookid));
    });
    const book: ePub.Book = ePub('../../../../../../assets/images/decrypted007.epub');
    // const book: ePub.Book = ePub('../../../../../../assets/images/Aa Manushyan Nee Thanne.epub');
    // const book: ePub.Book = ePub('../../../../../../assets/images/Amusement Park.epub');
    // const book: ePub.Book = ePub('../../../../../../assets/images/Annathe Nayikamar.epub');
    // const book: ePub.Book = ePub('../../../../../../assets/images/Manassilakkam Kuttikale.epub');
    // const book: ePub.Book = ePub('../../../../../../assets/images/Nruthasala.epub');
    // const book: ePub.Book = ePub('../../../../../../assets/images/Swapnangal.epub');
    // const book: ePub.Book = ePub('../../../../../../assets/images/Vangoghinte Kamuki.epub');
    // const book: ePub.Book = ePub('../../../../../../assets/images/Yayathi.epub');
    // const book: ePub.Book = ePub('../../../../../../assets/images/Yoga-Naduvedanayakattan.epub');
    this.rendition = book.renderTo("area", {
      width: "auto",
      height: 500,
      manager:"continuous",
      flow: "paginated",
      snap:true
    });
    this.displayed = this.rendition.display(); 
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        // handle left arrow key
        this.rendition.prev();
      } else if (event.key === 'ArrowRight') {
        // handle right arrow key
        this.rendition.next();
      }
    });
  }
  Back(){
    
  }
}
