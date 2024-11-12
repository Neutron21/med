import { Component, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';


declare var bootstrap: any; // Esto es para evitar errores de TypeScript con Bootstrap

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements AfterViewInit {
  @ViewChild('eventModal') eventModal!: ElementRef; // Referencia al modal
  calendarVisible = true;
  currentEvents: EventApi[] = [];
  eventTitle: string = ''; // Nueva propiedad para almacenar el título del evento
  selectedDate: DateSelectArg | null = null; // Para almacenar la fecha seleccionada

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    views: {
      dayGridMonth: { buttonText: 'mes' },
      timeGridWeek: { buttonText: 'semana' },
      timeGridDay: { buttonText: 'día' },
      listWeek: { buttonText: 'lista' }
    },
    locale: esLocale, 
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };
  modalInstance: any;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.eventModal) {
      const modalElement = this.eventModal.nativeElement;
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.selectedDate = selectInfo;
    this.modalInstance.show();
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`¿Seguro que quieres borrar el evento '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
    }
  }
  
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  saveEvent() {
    if (this.eventTitle && this.selectedDate) {
      const calendarApi = this.selectedDate.view.calendar;
      calendarApi.unselect(); 

      const newEvent = {
        id: `${Date.now()}`, 
        title: this.eventTitle,
        start: this.selectedDate.startStr,
        end: this.selectedDate.endStr,
        allDay: this.selectedDate.allDay
      };

      calendarApi.addEvent(newEvent);
      this.eventTitle = ''; 
      this.selectedDate = null; 

      this.modalInstance.hide();
    }
  }
}
