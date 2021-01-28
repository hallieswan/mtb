/*  General Types ********************************/

import {
  Schedule,


  StartEventId, StudyDuration
} from './scheduling';

export interface StringDictionary<T> {
  [key: string]: T
}

export interface Response<T> {
  status: number
  ok: boolean
  data: T
}

export type RequestStatus = 'IDLE' | 'PENDING' | 'RESOLVED' | 'REJECTED'

/*  User Types ********************************/

export interface UserData {
  username?: string
  firstName: string
  lastName: string
  email?: string
  //phone?: Phone
  clientData: object
  //attributes?: UserAttributes
}

export interface LoggedInUserData extends UserData {
  sessionToken: string
  orgMembership: string
  dataGroups?: string[] 
  //consented: boolean
  sharingScope: string

  id: string
}

/*
export type EmailSigninParams = {
  email: string
  token: string
  password?: string
}






export type LoginType = 'PHONE' | 'EMAIL'
export type Phone = {
  number: string
  regionCode: string
}

export type UserAttributes = {
  address: string
  city: string
  state: string
  zip_code: string
  dob: string
  gender: string
}*/

/*
export interface RegistrationData {
  appId: string
  substudyIds: string[]

  email?: string
  phone?: Phone
  clientData: object
}
*/

/*
export type SignInData = {
  appId: string
}
export interface SignInDataPhone extends SignInData {
  phone: {
    number: string
    regionCode: string
  }
}

export interface SignInDataEmail extends SignInData {
  email: string
}*/

export type SessionData = {
  token: string | undefined
  orgMembership: string| undefined
  dataGroups?: string[]
  name?: string
  alert?: string
}

/****************  */
export type ResourceFormat = 'image/png'
export type AssessmentCategory = 'screenshot'
export type AssessmentResource = {
  category: AssessmentCategory

  deleted: boolean

  format: ResourceFormat
  guid: string
  language: string
  minRevision: 1
  modifiedOn: string
  title: string
  upToDate: boolean
  url: string
  version: number
  duration?: number

  /*category: "screenshot"
contributors: []
createdAtRevision: 1
createdOn: "2020-10-21T16:45:47.116Z"
creators: ["Dan Webster"]
date: "2020"
deleted: false
description: ""
format: "image/png"
guid: "UkTT0LrvkEHtQySDr6_6XUjy"
language: "en"
minRevision: 1
modifiedOn: "2020-10-21T16:45:47.116Z"
publishers: []
title: "Landscape screenshot"
type: "AssessmentResource"
upToDate: true
url: "https://docs.sagebridge.org/assessments/psoriasisDraw_2020_04_29.png"
version: 0*/
}
export type Assessment = {
  createdOn: string
  customizationFields: object
  deleted: boolean
  guid: string
  identifier: string
  modifiedOn?: string
  normingStatus: string
  osName: string //iPhone OS"
  ownerId: string //sage-bionetworks"
  revision: number
  summary: string
  tags: string[]
  title: string
  type: string
  version: number
  validationStatus: string
  duration?: number
  resources?: any[]
}




export type StudyStatus = 'DRAFT' | 'ACTIVE' | 'COMPLETED'
export type Study = {
  identifier: string
  status: StudyStatus
  name: string
  subtitle?: string
  description?: string
  studyDuration?: StudyDuration
  // sessions: StudySession[]
}


export type StudyArm = {
  id: string
  name: string
  studyId: string
 startEventId?: StartEventId
  schedule?: Schedule
  active?: boolean
}
