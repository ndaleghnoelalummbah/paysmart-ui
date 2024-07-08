import React, {FC} from 'react';

export type LabelProps= {
color: string;
name: string;
}
type ChartVariableProps ={
    chartLabel: LabelProps[]
}

const ChartVariable: FC<ChartVariableProps> = ({ chartLabel }) => {
    return (
      <>
        {chartLabel.map((item) => (
          <div className="flex min-w-47.5">
            <span className={`mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-${item.color}`}>
              <span className={`block h-2.5 w-full max-w-2.5 rounded-full bg-${item.color}`}></span>
            </span>
            <div className="w-full">
              <p className={`font-semibold text-${item.color}`}>{item.name}</p>
            </div>
          </div>
        ))}
      </>
    );
 }
export default ChartVariable