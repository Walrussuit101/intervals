export type Behavior = 'x' | 'o' | null

export interface IntervalSubjects {
    id: string
    target: Behavior
    comparison: Behavior
}