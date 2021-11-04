import {ReactComponent as NotificationsIcon} from '@assets/scheduler/notifications_icon.svg'
import {ReactComponent as TimerIcon} from '@assets/scheduler/timer_icon.svg'
import AssessmentImage from '@components/assessments/AssessmentImage'
import {useTimeline} from '@components/studies/scheduleHooks'
import LoadingComponent from '@components/widgets/Loader'
import SessionIcon from '@components/widgets/SessionIcon'
import {Box} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import {latoFont} from '@style/theme'
import {Schedule, StudySession, StudySessionGeneral} from '@typedefs/scheduling'
import React from 'react'
import {useErrorHandler} from 'react-error-boundary'
import Pluralize from 'react-pluralize'
import TimelinePlot from './timeline-plot/TimelinePlot'

const useStyles = makeStyles(theme => ({
  stats: {
    fontFamily: latoFont,
    fontWeight: 'bold',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',

    '& span': {
      padding: theme.spacing(2, 3, 2, 1),
    },
  },
  legend: {
    margin: theme.spacing(1, 0),
    display: 'flex',
    '& div': {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(0.25),
    },
    maxWidth: '90%',
    flexWrap: 'wrap',
  },
  toolTip: {
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(1, 1, 0.1, 1),
    boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.2)',
  },
  arrow: {
    backgroundColor: 'transparent',
    color: theme.palette.primary.dark,
    fontSize: '20px',
  },
  assessmentBox: {
    width: '100%',
    height: '100px',
    marginBottom: '8px',
  },
}))

export interface TimelineProps {
  schedule: Schedule

  studyId: string
}

export const TooltipHoverDisplay: React.FunctionComponent<{
  session: StudySession
  index: number
  getSession: Function
}> = ({session, index, getSession}) => {
  const classes = useStyles()
  return (
    <Tooltip
      key={`session_${session.guid}`}
      title={
        <Box width="115px">
          {session.assessments?.map((assessment, index) => {
            return (
              <Box
                className={classes.assessmentBox}
                key={`assmnt_${assessment.guid}_${index}`}>
                <AssessmentImage
                  resources={assessment.resources}
                  variant="small"
                  name={assessment.title}
                  key={index}
                  smallVariantProperties={{
                    width: '100%',
                    backgroundColor: '#F6F6F6',
                  }}></AssessmentImage>
              </Box>
            )
          })}
        </Box>
      }
      arrow
      classes={{
        tooltip: classes.toolTip,
        arrow: classes.arrow,
      }}>
      <Box style={{cursor: 'pointer'}}>
        <SessionIcon index={index} key={session.guid}>
          {getSession(session.guid!)?.label}
        </SessionIcon>
      </Box>
    </Tooltip>
  )
}

const ScheduleTimelineDisplay: React.FunctionComponent<TimelineProps> = ({
  studyId,
  schedule: schedFromDisplay,
}: TimelineProps) => {
  const handleError = useErrorHandler()

  const {data: timeline, error, isLoading} = useTimeline(studyId)

  const classes = useStyles()

  const getSession = (sessionGuid: string): StudySessionGeneral => {
    return timeline?.sessions.find(s => s.guid === sessionGuid)!
  }
  if (isLoading) {
    return <LoadingComponent reqStatusLoading={true} variant="small" />
  }
  if (error) {
    handleError(error!)
  }

  return (
    <Box py={3} px={0}>
      {!timeline && (
        <>
          This timeline viewer will update to provide a visual summary of the
          schedules you’ve defined below for each session!.
        </>
      )}
      {timeline && (
        <div className={classes.stats}>
          <NotificationsIcon />{' '}
          <Pluralize
            singular={'notification'}
            count={timeline.totalNotifications}
          />
          <TimerIcon />{' '}
          <Pluralize singular={'total minute'} count={timeline.totalMinutes} />
        </div>
      )}
      <Box display="flex" justifyContent="space-between">
        <Box className={classes.legend}>
          {schedFromDisplay?.sessions?.map((s, index) => (
            <TooltipHoverDisplay
              key={s.guid}
              session={s}
              index={index}
              getSession={getSession}
            />
          ))}
        </Box>
      </Box>
      {timeline?.schedule && (
        <TimelinePlot
          schedulingItems={timeline.schedule}
          maxWindows={Math.max(
            ...timeline.sessions.map(s => s.timeWindowGuids.length)
          )}
          sortedSessions={schedFromDisplay.sessions}></TimelinePlot>
      )}
    </Box>
  )
}

export default ScheduleTimelineDisplay
