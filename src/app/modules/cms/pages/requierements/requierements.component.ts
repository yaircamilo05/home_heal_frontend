import { Component, OnInit } from '@angular/core'
import introData from 'src/assets/static/introduction.json'
import casesData from 'src/assets/static/useCases.json'
import requirementsData from 'src/assets/static/requirements.json'

@Component({
  selector: 'app-requierements',
  templateUrl: './requierements.component.html',
  styleUrls: ['./requierements.component.scss']
})
export class RequierementsComponent implements OnInit {
  intro: any[] = []
  requirements: any[] = []
  userHistories: any[] = []
  useCases: any[] = []

  panelOpenState: boolean = true
  multipleFoldables: boolean = false

  step = 0
  StepLimit: number = 0


  constructor(
  ) { }

  ngOnInit(): void {
    this.intro = introData
    this.requirements = requirementsData
    this.useCases = casesData
    this.StepLimit =
      + this.intro.length
      + this.useCases.length
      + this.requirements.length
  }

  expandedSummary: { [key: number]: boolean } = {} // Usando el ID del diagnóstico como clave
  toggleExpand(stepId: number) {
    this.expandedSummary[stepId] = !this.expandedSummary[stepId]
  }

  prevStep() {
    console.log(this.useCases)
    this.step--
    if (this.step < 0) {
      this.step = 0
    }
  }

  nextStep() {
    this.step++
  }

  resetStep() {
    this.step = 0
  }

  setStep(index: number) {
    this.step = index
  }

  isArray(obj: any) {
    return Array.isArray(obj);
  }

}
