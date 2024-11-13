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
  eventTitle: string = ''; // Propiedad para almacenar el título del evento
  eventDate: string = ''; // Propiedad para almacenar la fecha seleccionada
  eventTime: string = ''; // Propiedad para almacenar la hora seleccionada
  selectedDate: DateSelectArg | null = null; // Para almacenar la fecha seleccionada
  eventColor: string = '#3788d8'; // Color de fondo por defecto para el evento
  eventTextColor: string = '#ffffff'; // Color de texto por defecto para el evento

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
    initialView:  window.innerWidth < 768 ? 'listWeek' : 'dayGridMonth',
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

    // Ocultar y volver a mostrar el calendario para forzar el redibujo en móvil
    if (window.innerWidth < 768) {
      this.calendarVisible = false;
      setTimeout(() => {
        this.calendarVisible = true;
        this.changeDetector.detectChanges();
      }, 0);
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
    this.changeDetector.detectChanges();
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
    if (this.eventTitle && this.selectedDate && this.eventDate && this.eventTime) {
      const calendarApi = this.selectedDate.view.calendar;
      calendarApi.unselect(); 

      // Combinar la fecha y hora seleccionadas para la cita
      const eventDateTime = new Date(`${this.eventDate}T${this.eventTime}`);

      const newEvent = {
        id: `${Date.now()}`, 
        title: this.eventTitle,
        start: eventDateTime.toISOString(), // Hora de inicio de la cita
        end: eventDateTime.toISOString(),   // Hora de fin (la misma hora en este caso)
        allDay: false,  // No es un evento todo el día
        backgroundColor: this.eventColor,  // Color de fondo seleccionado
        textColor: this.eventTextColor     // Color de texto seleccionado
      };

      calendarApi.addEvent(newEvent);
      this.eventTitle = ''; 
      this.eventDate = '';
      this.eventTime = '';
      this.eventColor = '#3788d8';
      this.eventTextColor = '#ffffff';
      this.selectedDate = null; 

      this.modalInstance.hide();
    }
  }
}
