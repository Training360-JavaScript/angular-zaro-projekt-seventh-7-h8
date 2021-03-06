import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TitleCommunicatiorService } from 'src/app/service/title-communicatior.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  private titleChanged$ = this.titleCommunicator.titleCommunicator$ ;

  public pageTitle: string = '';

  constructor(
    private element: ElementRef,
    private router: Router,
    private titleCommunicator: TitleCommunicatiorService
  ) {
    this.sidebarVisible = false;
  }

  ngOnInit(): void {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
        this.sidebarClose();
        const $layer: any = document.getElementsByClassName('close-layer')[0];
        if ($layer) {
            $layer.remove();
            this.mobile_menu_visible = 0;
        }
    });
    this.titleChanged$.subscribe(newTitle => {
      this.pageTitle = newTitle;
    });
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  };

  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  };

  sidebarToggle() {
    const $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];
    let $layer: any = document.getElementsByClassName('close-layer')[0];

    if (this.mobile_menu_visible == 1) {

      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');


      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = () => { //asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      };

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;

    }
  };


}
