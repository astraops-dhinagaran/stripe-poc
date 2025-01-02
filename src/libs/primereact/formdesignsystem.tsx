import { classNames } from "primereact/utils";

export const formDesignSystem = {
    inputtext: {
        root: ({ props, context }) => ({
            className: classNames(
                'border rounded-[12px] h-fit w-full px-[12px] py-[10px] outline-none'
            )
        })
    },
    button: {
        root: ({ props, context }) => ({
            className: classNames(
                'bg-[#3488FF] px-[12px] w-fit h-fit py-[10px] rounded-[12px] text-white'
            )
        })
    },
}

export const tableDesignSystem = {
    badge: {
        root: ({ props, context }) => ({
            
            className: classNames(
                {
                    'h-fit w-fit leading-4 py-2 rounded-full bg-opacity-10 bg-green-400 text-green-600 border border-green-600': props.severity == 'success',
                    'h-fit w-fit leading-4 py-2 rounded-full bg-opacity-10 bg-red-400 text-red-600 border border-red-600': props.severity == 'danger'
                }
            )
        })
    }

}