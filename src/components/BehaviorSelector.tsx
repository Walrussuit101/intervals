import { Behavior, IntervalSubjects } from "@/types"

interface props {
    subjects: IntervalSubjects
    updateSubjects: (id: string, target: Behavior, comparison: Behavior) => void
    comparison?: boolean
}
const BehaviorSelector = ({ subjects, updateSubjects, comparison }: props) => {
    return (
        <div className="flex flex-wrap gap-x-3 gap-y-0 justify-center">
            <div className="flex flex-col items-center">
                <p className="text-lg">Target Student</p>
                <div className="flex w-56">
                    <button 
                        className={`btn btn-lg btn-neutral w-1/2 ${subjects.target === 'x' ? 'btn-active' : 'btn-outline'} rounded-r-none text-xl`} 
                        onClick={() => {
                            updateSubjects(subjects.id, 'x', subjects.comparison)
                        }}
                    >X</button>
                    <button 
                        className={`btn btn-lg btn-neutral w-1/2 ${subjects.target === 'o' ? 'btn-active' : 'btn-outline' } rounded-l-none text-xl`} 
                        onClick={() => {
                            updateSubjects(subjects.id, 'o', subjects.comparison)
                        }}
                    >O</button>
                </div>
            </div>

            {
                comparison &&
                <div className="flex flex-col items-center">
                    <p className="text-lg">Comparison</p>
                    <div className="flex w-56">
                        <button 
                            className={`btn btn-lg btn-neutral w-1/2 ${subjects.comparison === 'x' ? 'btn-active' : 'btn-outline'} rounded-r-none text-xl`} 
                            onClick={() => {
                                updateSubjects(subjects.id, subjects.target, 'x')
                            }}
                        >X</button>
                        <button 
                            className={`btn btn-lg btn-neutral w-1/2 ${subjects.comparison === 'o' ? 'btn-active' : 'btn-outline'} rounded-l-none text-xl`} 
                            onClick={() => {
                                updateSubjects(subjects.id, subjects.target, 'o')
                            }}
                        >O</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default BehaviorSelector;