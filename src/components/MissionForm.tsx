import type { FormEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { validAmount } from '../ledger'

type Kind = 'EARN' | 'REDEEM'
type Draft = { kind: Kind, amount: string, description: string }
type Props = { kind: Kind, amount: string, description: string, balance: number, draft: Draft | null, onBack: () => void, onAmount: (value: string) => void, onDescription: (value: string) => void, onRestore: (draft: Draft) => void, onSubmit: (event: FormEvent) => void }
const format = (value: number) => new Intl.NumberFormat('en-IN').format(value)

export function MissionForm({ kind, amount, description, balance, draft, onBack, onAmount, onDescription, onRestore, onSubmit }: Props) {
  const reducedMotion = useReducedMotion()
  const earn = kind === 'EARN'
  const change = validAmount(amount) || 0
  const next = balance + (earn ? change : -change)
  return <div className={`adventure-screen mission-screen ${earn ? 'mission-screen--earn' : 'mission-screen--redeem'}`}>
    <button className="back adventure-back" onClick={onBack}>← Back to adventure</button>
    <section className="adventure-intro"><div className="adventure-intro__symbol" aria-hidden="true">{earn ? '✦' : '◈'}</div><span className="hero-label">{earn ? 'NEW MISSION' : 'THE REWARD VAULT'}</span><h1>{earn ? <>Mission<br/><em>complete?</em></> : <>Choose your<br/><em>reward</em></>}</h1><p>{earn ? 'Tell us about the good deed you completed.' : 'What treasure have your points unlocked?'}</p></section>
    <form className="mission-form" onSubmit={onSubmit}><div className="mission-form__step"><span>01</span><span>{earn ? 'POINTS EARNED' : 'POINTS TO REDEEM'}</span></div><label htmlFor="amount">{earn ? 'Points earned' : 'Points to use'}</label><div className="mission-form__amount"><input id="amount" inputMode="numeric" pattern="[0-9]*" min="1" type="number" value={amount} onChange={event => onAmount(event.target.value)} placeholder="0" required/><span>PTS</span></div><div className="mission-form__chips" aria-label="Quick point values">{(earn ? [5, 10, 25, 50] : [10, 25, 50, 100]).map(value => <motion.button type="button" key={value} onClick={() => onAmount(String(value))} aria-pressed={amount === String(value)} whileTap={reducedMotion ? undefined : { scale: .92 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>+{value}</motion.button>)}</div>
      <div className="mission-form__step"><span>02</span><span>{earn ? 'YOUR GOOD DEED' : 'YOUR REWARD'}</span></div><label htmlFor="description">{earn ? 'What did you do?' : 'What is the reward?'}</label><input id="description" maxLength={120} value={description} onChange={event => onDescription(event.target.value)} placeholder={earn ? 'e.g. Helped tidy the room' : 'e.g. A new book'} required/>
      <div className="mission-form__preview"><div><small>CURRENT BALANCE</small><strong>{format(balance)} <span>PTS</span></strong></div><span className="mission-form__arrow" aria-hidden="true">→</span><div><small>AFTER APPROVAL</small><motion.strong key={next} initial={reducedMotion ? false : { scale: 1.1, opacity: .5 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 330, damping: 22 }}>{format(next)} <span>PTS</span></motion.strong></div></div><p className="mission-form__note">A parent reviews this before any points are saved.</p><motion.button className="primary" type="submit" whileTap={reducedMotion ? undefined : { scale: .98 }} transition={{ type: 'spring', stiffness: 420, damping: 22 }}>Ask parent to review <span>→</span></motion.button></form>
    {draft && !description && <button className="restore" onClick={() => onRestore(draft)}>Restore saved draft</button>}
  </div>
}
