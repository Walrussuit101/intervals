interface Props {
    names: string[];
    addName: () => void;
    removeName: (i: number) => void;
    updateName: (i: number, value: string) => void;
    disable?: boolean
}
const NameModal = ({ names, addName, removeName, updateName, disable }: Props) => {
    return (
        <dialog id="name_modal" className="modal">
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            <div className="modal-box flex flex-col gap-3 h-[50vh]">
                <button className="btn btn-success text-lg" onClick={addName} disabled={disable}>New Name ({names.length})</button>
                {
                    names.map((name, i) => {
                        return (
                            <label className="input input-bordered flex items-center gap-2 pr-0" key={`name-${i}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input type="text" className="grow" value={name} onChange={e => updateName(i, e.target.value)} disabled={disable}/>
                                <button className="btn btn-square btn-error btn-outline" onClick={() => removeName(i)} disabled={disable}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </label>
                        )
                    })
                }
            </div>
        </dialog>
    )
}

export default NameModal;