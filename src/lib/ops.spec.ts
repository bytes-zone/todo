import { describe, expect, it } from 'vitest'
import * as ops from './ops'

describe('init', () => {
  it('should have todos', () => {
    expect(ops.init().todos).toEqual({})
  })

  it('should have root todos', () => {
    expect(ops.init().rootTodos).toEqual([])
  })
})
