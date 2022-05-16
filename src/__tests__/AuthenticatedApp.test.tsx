
import * as useUserSessionDataState from '@helpers/AuthContext'
import * as useStudy from '@services/studyHooks'
import { cleanup, render } from '@testing-library/react'
import { ExtendedError, Study } from '@typedefs/types'
import React from 'react'
import { UseQueryResult } from 'react-query'
import { MemoryRouter } from "react-router-dom"
import AuthenticatedApp from '../AuthenticatedApp'
import { loggedInSessionData, notLoggedInSessionData } from '../__mocks/user'
import { noStudy, studyData } from '../__mocks/useStudyResponses'
jest.mock('@helpers/AuthContext')
jest.mock('@services/studyHooks')

const mockedAuth = (useUserSessionDataState as jest.Mocked<typeof useUserSessionDataState>)
const mockedUseStudy = (useStudy as jest.Mocked<typeof useStudy>)


jest.mock('@components/widgets/AppTopNav', () => ({ }) => (
    <div>App Top Nav</div>
))

jest.mock('@components/studies/StudyList', () => ({ }) => (
    <div>Study List</div>
))
jest.mock('@components/studies/StudyTopNav', () => ({ }) => (
    <div>Study Top Nav</div>
))
jest.mock('@components/surveys/SurveyTopNav', () => ({ }) => (
    <div>Survey Top Nav</div>
))
jest.mock('@components/surveys/Surveys', () => ({ }) => (
    <div>Surveys page</div>
))
jest.mock('@components/studies/StudyBuilder', () => ({ }) => (
    <div>Study Builder</div>
))


function renderControl(location: string) {
    return render(
        <MemoryRouter initialEntries={[location]}>
            <AuthenticatedApp><div></div></AuthenticatedApp>
        </MemoryRouter>
    )
}

afterEach(() => {
    cleanup()
})


test('should throw if user not logged in', () => {

    mockedAuth.useUserSessionDataState.mockImplementation(() => notLoggedInSessionData)
    mockedUseStudy.useStudy.mockImplementation((x) => (noStudy as UseQueryResult<Study | undefined, ExtendedError>))

    try {
        expect(renderControl('/studies')).toThrow
    } catch (err) {
        expect(err.message.indexOf(document.location)).toBeGreaterThan(-1)
    }
})

test('should show app top nav if user logged in without a study link and now show study list', () => {

    mockedAuth.useUserSessionDataState.mockImplementation(() => loggedInSessionData)
    mockedUseStudy.useStudy.mockImplementation((x) => (noStudy as UseQueryResult<Study | undefined, ExtendedError>))
    const app = renderControl('/surveys/:id/design')
    expect(app.queryAllByText('Study List')).toHaveLength(0)
})

test('should show study list and app top nave if user logged in with a study link without study', () => {

    mockedAuth.useUserSessionDataState.mockImplementation(() => loggedInSessionData)
    mockedUseStudy.useStudy.mockImplementation((x) => (noStudy as UseQueryResult<Study | undefined, ExtendedError>))
    const app = renderControl('/studies')
    expect(app.queryAllByText('App Top Nav')).toHaveLength(1)
    expect(app.queryAllByText('Study List')).toHaveLength(1)
})
test('show study builder if and study top nav user logged in with a study link with a study', () => {

    mockedAuth.useUserSessionDataState.mockImplementation(() => loggedInSessionData)

    const study = { ...noStudy, data: studyData }
    mockedUseStudy.useStudy.mockImplementation((x) => (study as UseQueryResult<Study | undefined, ExtendedError>))
    const app = renderControl('/studies/builder/123')
    expect(app.queryAllByText('Study List')).toHaveLength(0)
    expect(app.queryAllByText('App Top Nav')).toHaveLength(0)
    expect(app.queryAllByText('Study Top Nav')).toHaveLength(1)
    expect(app.queryAllByText('Study Builder')).toHaveLength(1)
})
