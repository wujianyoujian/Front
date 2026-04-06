import removeDuplicates from '../26.删除有序数组中的重复项'

describe('删除有序数组中的重复项', () => {
  it('[0,0,1,1,1,2,2,3,3,4] => [0,1,2,3,4]', () => {
    expect(removeDuplicates([0,0,1,1,1,2,2,3,3,4])).toBe([0,1,2,3,4].length)
  })
})