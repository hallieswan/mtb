import {FormControlLabel, Radio, RadioGroup} from '@mui/material'
import React from 'react'
import SmallTextBox from '../../widgets/SmallTextBox'
import {FormControlLabelHidden} from '../../widgets/StyledComponents'
import SchedulingFormSection from './SchedulingFormSection'

export interface EndDateProps {
  occurrences?: number
  onChange: Function
}
export type SessionScheduleEndType = 'END_STUDY' | 'N_OCCURRENCES'

const EndDate: React.FunctionComponent<EndDateProps> = ({occurrences, onChange}: EndDateProps) => {
  const [endType, setEndType] = React.useState<SessionScheduleEndType>(occurrences ? 'N_OCCURRENCES' : 'END_STUDY')

  const changeEndDate = (type: SessionScheduleEndType) => {
    setEndType(type)
    if (type === 'END_STUDY') {
      onChange(undefined)
    } else {
      setEndType(type)
    }
  }

  return (
    <SchedulingFormSection label={'End after*:'}>
      <RadioGroup
        aria-label="End after"
        name="endAfter"
        value={endType}
        onChange={e => changeEndDate(e.target.value as SessionScheduleEndType)}>
        <FormControlLabel value={'END_STUDY'} control={<Radio />} label="End of study " />
        <FormControlLabel
          control={
            <>
              <Radio value={'N_OCCURRENCES'} />{' '}
              <FormControlLabelHidden
                label="number of occurrences"
                control={
                  <SmallTextBox
                    onFocus={() => changeEndDate('N_OCCURRENCES')}
                    id="occurrences"
                    sx={{marginBottom: 0, marginRight: '10px'}}
                    isLessThanOneAllowed={false}
                    onChange={e => onChange(e.target.value)}
                    value={occurrences || ''}
                  />
                }
              />
            </>
          }
          label="times"
        />
      </RadioGroup>
    </SchedulingFormSection>
  )
}

export default EndDate
