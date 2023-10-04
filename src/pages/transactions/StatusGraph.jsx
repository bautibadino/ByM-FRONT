import { PieChart } from "./pieChart"

export const StatusGraph = ({transactions}) => {

    const pendingTransactions = transactions.filter((transaction) => {
        if(transaction.status === "DEBITED") {
            return transaction
        }
    })
    const paidTransactions = transactions.filter((transaction) => {
        if(transaction.status === "PAID") {
            return transaction
        }
    })
   
    
  return (
    <div className='w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600 flex flex-col items-center justify-center '>
        <div className='w-full bg-slate-100 rounded-md flex flex-col justify-center items-center mt-3 md:w-3/4'>
            <h3 className='text-xl font-bold text-center mt-3'>ESTADOS DE VENTAS</h3>
            <div className='flex flex-col w-full my-6'>
                <div>
                   <PieChart 
                   paidTransactions={paidTransactions}
                   pendingTransactions={pendingTransactions}
                   transactions={transactions}/>
                </div>
                <div className="m-6">

                <p className='text-lg text-darkblack-600 '>Cantidad total de transacciones: {transactions.length}</p>
                <p>{`Transacciones pagas: ${paidTransactions.length}`}</p>
                <p>{`Transacciones adeudadas: ${pendingTransactions.length}`}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
