import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataInsightService } from '../services/data-insight.service';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js/auto';
Chart.register(...registerables);

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css',
})
export class InsightsComponent {
  constructor(private readonly dataInsights: DataInsightService) {}

  chart: Chart<any> | null = null;
  topInfluences: any;
  workMetrics: any;
  isReasons: boolean = true;
  isMetrics: boolean = false;
  isIndividualMetric: boolean = false;
  orderedMetrics: any = [];
  metricLabels: string[] = [];

  async ngOnInit(): Promise<void> {
    this.topInfluences = await this.dataInsights.get_top_influences();
    this.workMetrics = await this.dataInsights.get_agreed_workmetrics();

    await this.dataInsights.get_metrics_count().then((data) => {
      this.orderedMetrics = {};
      Object.keys(data).forEach((key) => {
        let values = [];
        for (let i = 1; i <= Object.keys(data[key]).length; i++) {
          values.push(data[key][i.toString()]);
        }
        this.orderedMetrics[key] = values;
      });
    });
    this.metricLabels = Object.keys(this.orderedMetrics);

    this.loadReasonsChart();
  }

  onMetricChange(event: any) {
    this.renderMetricRadar(this.orderedMetrics[event.target.value]);
  }

  loadReasonsChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    console.log('loading reasons chart');
    this.isReasons = true;
    this.isMetrics = false;
    this.isIndividualMetric = false;
    this.renderTopInfluencesChart();
  }

  loadAggregatedMetricsChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    console.log('loading metrics chart');
    this.isMetrics = true;
    this.isReasons = false;
    this.isIndividualMetric = false;
    this.renderAgreeDisagreeChart();
  }

  loadIndividualMetricChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    console.log('loading individual metric chart');
    this.isIndividualMetric = true;
    this.isMetrics = false;
    this.isReasons = false;
    this.renderMetricRadar(this.orderedMetrics['Support_Professional_Development']);
  }

  renderMetricRadar(metricData: number[]) {
    if (this.chart) {
      this.chart.destroy();
    }
    const chartElement = document.getElementById('chart') as HTMLCanvasElement;
    if (chartElement) {
      this.chart = new Chart(chartElement, {
        type: 'radar',
        data: {
          labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
          datasets: [
            {
              label: 'Count',
              data: metricData,
              borderColor: 'rgba(255, 99, 132, 0.6)',
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderWidth: 1,
            },
          ],
        },
      });
    } else {
      console.error('chart element is null');
    }
  }

  renderAgreeDisagreeChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.workMetrics === null) {
      console.error('Agreed or disagreed metrics are null/undefined');
      return;
    }
    let metricLabels: string[] = this.workMetrics.map((row: string[]) => row[0]);
    let metricData: number[] = this.workMetrics.map((row: string[]) => row[1]);
    const chartElement = document.getElementById('chart') as HTMLCanvasElement;
    if (chartElement) {
      this.chart = new Chart(chartElement, {
        type: 'polarArea',
        data: {
          labels: metricLabels,
          datasets: [
            {
              label: 'Metric Scores',
              data: metricData,
              backgroundColor: [
                'rgba(242, 12, 12, 0.6)',
                'rgba(242, 89, 12, 0.6)',
                'rgba(242, 165, 12, 0.6)',
                'rgba(242, 242, 12, 0.6)',
                'rgba(165, 242, 12, 0.6)',
                'rgba(89, 242, 12, 0.6)',
                'rgba(12, 242, 12, 0.6)',
                'rgba(12, 242, 89, 0.6)',
                'rgba(12, 242, 165, 0.6)',
                'rgba(12, 242, 242, 0.6)',
                'rgba(12, 165, 242, 0.6)',
                'rgba(12, 89, 242, 0.6)',
                'rgba(12, 12, 242, 0.6)',
                'rgba(89, 12, 242, 0.6)',
                'rgba(165, 12, 242, 0.6)',
                'rgba(242, 12, 242, 0.6)',
                'rgba(242, 12, 165, 0.6)',
                'rgba(242, 12, 89, 0.6)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 20,
              },
            },
            title: {
              display: true,
              text: 'Aggregation of Scores for each Metric',
              color: 'black',
              position: 'top',
              font: {
                weight: 'bold',
                size: 16,
              },
            },
          },
        },
      });
    } else {
      console.error('chart element is null');
    }
  }

  renderTopInfluencesChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.topInfluences === null) {
      console.error('topInfluences is null or undefined');
      return;
    }
    let labelFmt: string[] = this.topInfluences.map((row: string) => row[0]);
    let dataFmt: number[] = this.topInfluences.map((row: any) => row[1]);
    const chartElement = document.getElementById('chart') as HTMLCanvasElement;
    if (chartElement) {
      this.chart = new Chart(chartElement, {
        type: 'doughnut',
        data: {
          labels: labelFmt,
          datasets: [
            {
              data: dataFmt,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 205, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(201, 203, 207, 0.6)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
              ],
              borderRadius: 10,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              ticks: {
                maxRotation: 0,
                autoSkip: false,
              },
            },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'right',
              labels: {
                boxWidth: 40,
              },
            },
            title: {
              display: true,
              text: 'Top reasons influencing the decision to leave the college',
              color: 'black',
              position: 'top',
              font: {
                weight: 'bold',
                size: 16,
              },
            },
          },
        },
      });
    } else {
      console.error('chart element is null');
    }
  }
}
