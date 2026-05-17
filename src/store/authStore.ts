'use client'
import { useState } from 'react'

export type UserRole = 'admin' | 'developer' | null

let role: UserRole = null
export function getRole() { return role }
export function setRole(r: UserRole) { role = r }
