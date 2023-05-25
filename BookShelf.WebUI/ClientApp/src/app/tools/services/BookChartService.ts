import { Injectable, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IBookResponse } from '../../tools/Interfaces/IBook';

@Injectable({
  providedIn: 'root'
})
export class BookChartService {
  private chart: Chart | undefined;

  constructor() {
    Chart.register(...registerables);
  }

  generateChart(books: IBookResponse[], elementRef: ElementRef) {
    const canvas = elementRef.nativeElement.querySelector('#bookChart');
    const years: number[] = [];
    const bookCounts: number[] = [];

    books.forEach(book => {
      const year = new Date(book.publishDate).getFullYear();
      const index = years.indexOf(year);

      if (index !== -1) {
        bookCounts[index]++;
      } else {
        years.push(year);
        bookCounts.push(1);
      }
    });

    if (this.chart) {
      this.chart.destroy();
    }
    years.sort((a, b) => b - a);

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: years.map(year => year.toString()),
        datasets: [
          {
            label: 'Number of Books',
            data: bookCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Year'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Books'
            },
            beginAtZero: true,
            ticks: {
              precision: 0,
              stepSize: 1
            }
          }
        }
      }
    });
  }

  toggleChart() {
    if (this.chart) {
      if (this.chart.canvas) {
        const canvas = this.chart.canvas;
        const displayStyle = this.chart.canvas.style.display;

        if (displayStyle === 'none') {
          canvas.style.display = 'block';
          this.chart.resize();
        } else {
          canvas.style.display = 'none';
          this.chart.resize(0, 0);
        }
      }
    }
  }
}
