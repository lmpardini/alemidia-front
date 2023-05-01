import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions,  EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import allLocales from '@fullcalendar/core/locales-all';
import { ContratoService } from "../../../../core/services/contrato.service";
import { DesejaCancelarComponent } from "../../../../shared/dialogs/deseja-cancelar/deseja-cancelar.component";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { auto } from "@popperjs/core";
import { debounceTime } from "rxjs";


@Component({
  selector: 'app-agenda-home',
  templateUrl: './agenda-home.component.html',
  styleUrls: ['./agenda-home.component.scss']
})
export class AgendaHomeComponent implements OnInit{

  currentEvents: EventApi[] = []

  eventos: any[] = [];
  eventosPorData:any[] = [];
  mostraTemplateVazio:boolean = false;

  formFiltro!: UntypedFormGroup

  constructor(private changeDetector: ChangeDetectorRef,
              private contratoService: ContratoService,
              private router: Router,
              private dialog: MatDialog,
              private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm(): void {

    this.formFiltro = this.fb.group({
      data_evento: [null, Validators.required],
    });

    this.formFiltro.get('data_evento')?.valueChanges.pipe(
      debounceTime(500)).subscribe({next: () => {
      this.contratoService.listByDate({data: this.formFiltro.get('data_evento')?.value}).subscribe({next: (res) => {
        this.eventosPorData = res.data;
      }});
      this.mostraTemplateVazio = true;
    }});
  }

  // @ts-ignore
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', // Defina a visualização inicial (mês)
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    themeSystem: 'bootstrap5',
    locales: allLocales,
    locale: 'pt-BR',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    scrollTime: null,

    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    datesSet: this.handleEvents.bind(this),
    eventClick: this.handleEventClick.bind(this),
    initialEvents: [this.eventos]
  };


  handleEvents(events: any) {
    const dataInicio = new Date(events.startStr).toISOString().replace(/T.*$/, '');
    const dataFim = new Date(events.endStr).toISOString().replace(/T.*$/, '');

    this.contratoService.listarEventos({data_inicio: dataInicio, data_fim: dataFim}).subscribe({next: (res) => {
        this.eventos = res.data
    }});
  }

  handleEventClick(arg: EventClickArg) {
    const id = parseInt(arg.event.id);
    const title = arg.event.title;

    this.contratoService.listContratoResumo(id).subscribe({next: (res) => {
        this.openDialogDetalheEventos(res.data, title);
      }});
  }

  public openDialogDetalheEventos(dadosEvento:any, title:any): void {
    const dialogRef = this.dialog.open(DesejaCancelarComponent, {
      data: {
        titulo: title,
        descricao: "Detalhes do evento:  " ,
        dados_evento: [
          'Contrato : '+dadosEvento?.contrato,
          'Data Evento : '+dadosEvento?.data_evento,
          'Noivos/Debutante: '+dadosEvento?.noivo_debutante,
          'Contratante: '+dadosEvento?.contratante,
          'Espaço: '+dadosEvento?.espaco,
          'Assessoria: '+dadosEvento?.assessoria,
          'Horario: '+dadosEvento?.hora_inicio+' as '+dadosEvento.hora_fim,
          'Quantidade convidados: '+dadosEvento?.qtde_convidados,
          'Produtos: '+dadosEvento?.produtos,
        ],
        tipo: 'resumo_contrato'
      }
    });
  }


  protected readonly auto = auto;
}
