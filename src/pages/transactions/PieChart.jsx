import { Chart as ChartJS , ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export const PieChart = ({transactions, paidTransactions, pendingTransactions}) => {

    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }
    
    const data = {
        labels: ['Transacciones pagas', 'Transacciones adeudadas'],
        datasets: [
            {
                label: 'Transacciones',
                data: [ paidTransactions.length, pendingTransactions.length ],
                backgroundColor: [
                    '#00d91d',
                    '#ff1303',
                ],
            }
        ]
    }

    return(
        <Pie 
        data={data}
        options={options}
        />
    )
}

