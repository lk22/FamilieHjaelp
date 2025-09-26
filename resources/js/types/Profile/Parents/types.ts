/**
 * Child entity representing a child of a parent.
 * @interface Child
 */
export interface Child {
    id: number;
    name: string;
    age: number;
    school: string;
}

/**
 * ScheduledEvent entity representing a scheduled event for a child.
 * 
 * @interface ScheduledEvent
 */
export interface ScheduledEvent {
    id: number;
    title: string;
    date: string;
    description: string;
    child: Child;
}

/**
 * ScheduledActivity representing a scheduled activity for a parent
 * 
 * @interface ScheduledActivity
 */
export interface ScheduledActivity {
    id: number;
    title: string;
    date: string;
    description: string;
}