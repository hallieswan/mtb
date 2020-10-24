import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { RouteComponentProps } from 'react-router-dom'
import { Draggable } from 'react-beautiful-dnd'
import clsx from 'clsx'
import { Assessment, AssessmentResource } from '../../types/types'
import { Box, CardMedia } from '@material-ui/core'
import { LeakAddTwoTone } from '@material-ui/icons'
import validated from '../../assets/validated.svg'

const useStyles = makeStyles({
  root: {
    width: '300px',
    border: '1px solid gray',
    padding: 0,

    display: 'flex',
    flexDirection: 'column',
  },
  dragging: {
    width: '250px !important',
    height: '250px !important',
  },

  title: {
    fontSize: 14,
  },
  content: {
    flexGrow: 1,
  },

  media: {
    height: 180,
    backgroundPositionY: 'top',
  },
  bottom: {
    marginTop: 'auto',
    display: 'flex',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

type AssessmentCardOwnProps = {
  assessment: Assessment
  index: number
}

type AssessmentCardProps = AssessmentCardOwnProps

const AssessmentCard: FunctionComponent<AssessmentCardProps> = ({
  assessment,

  index,
}) => {
  const classes = useStyles()
  // const bull = <span className={classes.bullet}>•</span>

  const className = clsx({ [classes.root]: true, [classes.dragging]: false })
  //console.log('className', className)

  const TopImage = ({
    resources,
    name,
  }: {
    resources: AssessmentResource[] | undefined
    name: string
  }) => {
    const screens = resources?.filter(
      resource =>
        resource.category === 'screenshot' &&
        !resource.deleted &&
        resource.upToDate &&
        resource.url,
    )
    let url = '/assets/placeholder.png'
    if (screens && screens.length) {
      const portrait = screens.find(
        screen => screen.title === 'Portrait screenshot',
      )
      if (portrait) {
        url = portrait.url
      } else {
        url = screens[0].url
      }
    }

    return <CardMedia className={classes.media} image={url} title={name} />
  }

  return (
    <Card className={classes.root}>
      <TopImage
        resources={assessment.resources}
        name={assessment.title}
      ></TopImage>
      <CardContent className={classes.content}>
        <Typography color="textSecondary" gutterBottom>
          {assessment.title}
        </Typography>
        <span>tags:{assessment.tags.join(',')}</span>

        <Typography className={classes.title} color="textSecondary">
          {assessment.summary}
        </Typography>
      </CardContent>
      <CardActions className={classes.bottom}>
        <div>{assessment.duration} </div>
        <img src={validated} />
      </CardActions>
    </Card>
  )
}

export default AssessmentCard
