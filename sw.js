importScripts('cube.js')

const SOLVED_STATES = solvedStates()

const MOVE_GROUPS = [
    ["U","U'","E","E'","D","D'"],
    ["R","R'","M","M'","L","L'"],
    ["F","F'","S","S'","B","B'"],
]
const MOVE_META = {}
MOVE_GROUPS.forEach((group, gi) =>
    group.forEach((name, ci) => { MOVE_META[name] = { gi, ci } })
)
const ALL_MOVES = MOVE_GROUPS.flat()

function opposite(name) {
    return name.endsWith("'") ? name.slice(0, -1) : name + "'"
}

function heuristic(state) {
    let best = Infinity
    for (const solved of SOLVED_STATES) {
        let n = 0
        for (let i = 0; i < 54; i++) if (state[i] !== solved[i]) n++
        if (n < best) best = n
    }
    return Math.floor(best / 8)
}

function search(state, path, bound, lastMove, lastGi) {
    const h = heuristic(state)
    const f = path.length + h
    if (f > bound) return f
    if (h === 0 && SOLVED_STATES.some(s => state.every((v, i) => v === s[i]))) return path
    let min = Infinity
    for (const move of ALL_MOVES) {
        const { gi, ci } = MOVE_META[move]
        if (lastMove !== null && move === opposite(lastMove)) continue
        if (gi === lastGi && MOVE_META[lastMove].ci >= ci) continue
        const next = applyMove(state, move)
        const result = search(next, [...path, move], bound, move, gi)
        if (Array.isArray(result)) return result
        if (result < min) min = result
    }
    return min
}

function idaStar(state) {
    let bound = heuristic(state)
    while (bound <= 25) {
        const result = search(state, [], bound, null, -1)
        if (Array.isArray(result)) return result
        if (result === Infinity) return null
        bound = result
    }
    return null
}

self.onmessage = function(e) {
    if (e.data.type !== "solve") return
    const solution = idaStar(e.data.state)
    if (solution !== null) {
        self.postMessage({ type: "solution", moves: solution })
    } else {
        self.postMessage({ type: "error", message: "No solution found within depth limit" })
    }
}
