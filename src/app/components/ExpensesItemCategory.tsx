import React from 'react'

function ExpensesItemCategory({color,title}:any) {
  return (
   <button className='button button-primary'>
   <div className="flex items-center justify-between mt-4 p-3 bg-slate-300 rounded-3xl hover:shadow-xl">
   <div className="flex items-center gap-2">
     <div className="w-[25px] h-[25px] rounded-full" style={{backgroundColor:color}} />
     <h4 className="capitalize">{title}</h4>
   </div>
 </div>
 </button>
  )
}

export default ExpensesItemCategory