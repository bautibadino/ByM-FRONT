import React from 'react'
import { LineChart } from './LineChart'

export const PaymentTypeGraph = ({transactions}) => {
  return (
    <div className='w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600 '>
    <div className='w-full bg-slate-100 rounded-md flex flex-col justify-center items-center mt-3 md:w-1/2'>
        <h3 className='text-xl font-bold text-center mt-3'>ESTADOS DE VENTAS</h3>
        <div className='flex flex-col w-3/4 my-6'>
            <div>
               <LineChart
               transactions={transactions}/>
            </div>
            {/* <p className='text-lg text-darkblack-600 '>Cantidad total: {transactions.length}</p> */}
            {/* <span>{`Transacciones pagas: ${paidTransactions.length}`}</span> */}
            {/* <span>{`Transacciones adeudadas: ${pendingTransactions.length}`}</span> */}
        </div>
    </div>
</div>
  )
}
