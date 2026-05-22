function benchmark(produceFn, label = 'produce') {
  function createLargeState(size = 100000) {
    const items = []
    for (let i = 0; i < size; i++) {
      items.push({ id: i, name: `item-${i}`, value: Math.random() })
    }
    return { items, meta: { count: size, version: 1 } }
  }

  const state = createLargeState(1000)
  const ITERATIONS = 1000

  const start = performance.now()
  for (let i = 0; i < ITERATIONS; i++) {
    produceFn(state, (draft) => {
      draft.meta.version += 1
    })
  }
  const end = performance.now()

  console.log(`[${label}] ${ITERATIONS} 次，总耗时：${(end - start).toFixed(2)}ms，平均：${((end - start) / ITERATIONS).toFixed(4)}ms`)
}

function produce(baseState, recipe) {
  // 1. 深拷贝一份草稿
  const draft = JSON.parse(JSON.stringify(baseState))
  // 2. 让用户修改草稿
  recipe(draft)
  // 3. 返回修改后的草稿作为新 state
  return draft
}

function produce1(baseState, recipe) {
  let modified = false;
  let draft = baseState

  const proxy = new Proxy(baseState, {
    get(target, key) {
      return target[key]
    },
    set(target, key, value) {
      if (!modified) {
        draft = { ...baseState }
        modified = true
      }
      draft[key] = value
      return true
    }
  })
}

function produce3(baseState, recipe) {
  const copies = new Map()

  function getOrCreateCopy(target) {
    if (!copies.has(target)) {
      copies.set(target, { ...target })
    }
    return copies.get(target)
  }

  // 新增 parent 和 parentKey 参数
  function createProxy(target, parent, parentKey) {
    return new Proxy(target, {
      get(t, key) {
        const source = copies.has(t) ? copies.get(t) : t
        const value = source[key]
        if (value !== null && typeof value === 'object') {
          return createProxy(value, t, key)  // 传入父节点信息
        }
        return value
      },
      set(t, key, value) {
        const copy = getOrCreateCopy(t)
        copy[key] = value

        // 向上冒泡：把父节点也拷贝，并更新父节点中指向当前节点的引用
        if (parent !== undefined) {
          const parentCopy = getOrCreateCopy(parent)
          parentCopy[parentKey] = copy
        }

        return true
      }
    })
  }

  recipe(createProxy(baseState, undefined, undefined))

  return copies.has(baseState) ? copies.get(baseState) : baseState
}



const state = {
  user: {
    profile: {
      name: 'Alice',
      age: 25,
      address: {
        city: 'Beijing',
        zip: '100000'
      }
    },
  },
}

const nextState = produce3(state, (draft) => {
  draft.user.profile.address.city = 'Shanghai'
})

// benchmark(produce)
// benchmark(produce1)
// benchmark(produce3)


