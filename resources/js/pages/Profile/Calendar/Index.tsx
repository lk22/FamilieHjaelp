import Fullcalendar from '@fullcalendar/react';

import DeleteCalendarEvent from '@/components/Profile/Dialogs/Calendar/DeleteCalendarEvent';
import { useForm } from '@inertiajs/react'

import { useRef, useState } from 'react'
import {
  EventApi,
  EventInput,
  DateSelectInfo,
  EventClickInfo,
  EventDisplayInfo,
  formatDate,
} from '@fullcalendar/react'
import FullCalendar from '@fullcalendar/react'
import themePlugin from '@fullcalendar/react/themes/classic'
import dayGridPlugin from '@fullcalendar/react/daygrid'
import timeGridPlugin from '@fullcalendar/react/timegrid'
import interactionPlugin from '@fullcalendar/react/interaction'

import '@fullcalendar/react/skeleton.css'
import '@fullcalendar/react/themes/classic/theme.css'
import '@fullcalendar/react/themes/classic/palette.css'

import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog'

interface SidebarProps {
  weekendsVisible: boolean;
  handleWeekendsToggle: () => void;
  currentEvents: EventApi[];
}

let eventGuid = 0
const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:30:00'
  }
]

function createEventId() {
  return String(eventGuid++)
}

export default function Index() {
  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true)
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([])
  const [createCalendarEventDialogOpen, setCreateCalendarDialogOpen] = useState<boolean>(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false)
  const [newEventDialogOpen, setNewEventDialogOpen] = useState<boolean>(false)
  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible)
  }

  function handleDateSelect(selectInfo: DateSelectInfo) {
    setCurrentSelectInfo(selectInfo)
    let title = prompt('Please enter a new title for your event')
    let calendarApi = currentSelectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: currentSelectInfo.startStr,
        end: currentSelectInfo.endStr,
        allDay: currentSelectInfo.allDay
      })
    }
  }
  const [currentEventClickInfo, setCurrentEventClickInfo] = useState<EventClickInfo | null>(null)
  const [currentSelectInfo, setCurrentSelectInfo] = useState<DateSelectInfo | null>(null)

  console.log(currentEventClickInfo)


  function handleEventClick(infoClick: EventClickInfo) {
    setCurrentEventClickInfo(infoClick)
    setDeleteDialogOpen(true)
  }

  const handleDelete = (clickInfo: EventClickInfo) => {
    setCurrentEventClickInfo(clickInfo)
    setDeleteDialogOpen(true)
    // clickInfo.event.remove()
  }

  function handleEvents(events: EventApi[]) {
    setCurrentEvents(events)
  }

  return (
    <ProfileOverviewLayout title="Calendar">
          <Sidebar
            weekendsVisible={weekendsVisible}
            handleWeekendsToggle={handleWeekendsToggle}
            currentEvents={currentEvents}
          />
          <FullCalendar
            className='demo-app-calendar'
            plugins={[themePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleDelete}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
      <CreateCalendarEventDialog
        isOpen={createDialogOpen}
        setDialogClose={() => setCreateDialogOpen(false)}
        onCreate={(clickInfo) => {
          clickInfo.event.setProp('title', 'New Event')
        }}
        selectInfo={currentSelectInfo!}
      />
      <DeleteCalendarEventDialog
        isOpen={deleteDialogOpen}
        setDeleteDialogClose={() => setDeleteDialogOpen(false)}
        onDelete={(clickInfo) => {
          clickInfo.event.remove()
        }}
        clickInfo={currentEventClickInfo!}
      />
    </ProfileOverviewLayout>
  )
}

interface DeleteCalendarEventDialogProps {
  isOpen: boolean
  setDeleteDialogClose: () => void
  onDelete: (clickInfo: EventClickInfo) => void
  clickInfo: EventClickInfo
}

interface CreateCalendarEventDialogProps {
  isOpen: boolean
  setDialogClose: () => void
  onCreate: (clickInfo: EventClickInfo) => void
  selectInfo: DateSelectInfo
}


const CreateCalendarEventDialog = ({isOpen, setDialogClose, onCreate, selectInfo}: CreateCalendarEventDialogProps) => {

  const {setData, post, processing } = useForm<{
    title: string
    start: string;
    end: string;
    allDay: boolean;
  }>({
    title: '',
    start: selectInfo.startStr,
    end: selectInfo.endStr,
    allDay: selectInfo.allDay
  })

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) setDialogClose()
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            Fill in the details for the new event.
          </DialogDescription>
        </DialogHeader>
        <form>
          <label>
            Event Title:
            <input
              type="text"
              name="titlevent-title"
              onChange={(e) => selectInfo.view.calendar.addEvent({
                title: e.target.value,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
              })}
            />
          </label>
          <div className="flex">
            <div className="start">
              <input type="datetime-local" name="event-start" id="event-start" />
            </div>
            <div className="end">
              <input type="datetime-local" name="event-end" id="event-end" />
            </div>
          </div>
        </form>
        <DialogFooter>
          <button onClick={() => {
            onCreate(clickInfo)
            setDialogClose()
          }}>Create</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DeleteCalendarEventDialog({isOpen, setDeleteDialogClose, onDelete, clickInfo}: DeleteCalendarEventDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) setDeleteDialogClose()
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this event?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button onClick={() => {
            onDelete(clickInfo)
            setDeleteDialogClose()
          }}>Delete</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function renderEventContent(eventInfo: EventDisplayInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function Sidebar({
  weekendsVisible,
  handleWeekendsToggle,
  currentEvents,
}: SidebarProps) {
  return (
    <div>
      <h2>Sidebar</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          />
          Show Weekends
        </label>
      </div>
      <div>
        <h3>Current Events</h3>
        <ul>
          {currentEvents.map(event => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}