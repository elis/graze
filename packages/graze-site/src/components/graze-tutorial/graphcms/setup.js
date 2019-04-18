import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Redirect, Link } from 'react-router-dom'

export const Setup = props => {
  const { step } = props.match.params

  const Comp = Step(content[+step - 1] ? +step : 1)
  return (
    <Comp {...props} data={props.data} />
  )
}

export const Welcome = props => {
  const { url } = props.match

  const { SiteContext } = require('../../../site')
  const site = useContext(SiteContext)

  return (
    <React.Fragment>
      {site && !!Object.keys(site).length && (<Redirect to={`${url}/step-1`} />)}
      <div className='avenir center mw6 pt6 pb6'>
        <h3 className='helvetica' >Welcome to Graze.</h3>
        <p className='georgia' >You've connected a new GraphCMS.</p>
        <p className='georgia' >We'll Set you up in no time.</p>
        <p className='tr'>
          <Link to={`${url}/step-1`} className='f6 link br2 ph3 pv2 mb2 dib white bg-blue shadow grow pointer'>Step 1: Create 'Site' Model</Link>
        </p>
      </div>

    </React.Fragment>
  )
}

export const Step = step => props => {
  const dayjs = require('dayjs')
  const ArticleFullBleed = require('../../articles/full-bleed').default
  const { get: getGA } = require('../../../services/analytics')

  const [messages, setMessages] = useState([])
  const [log, setLog] = useState([])
  const addMessage = (message, payload) => setMessages(msgs => ([{ message, payload, time: Date.now() }, ...msgs]))

  const ReactGA = getGA()

  const check = () => {
    const { refetch } = props.data || {}

    // During setup phase
    if (refetch) {
      const res = refetch()
      addMessage('Checking schema...')
      res.then(r => {
        addMessage('Received scheme, checking types...')
        const { types } = r.data['__schema'] || {}

        if (step === 1) {
          const hasSite = types && types.length && types.find(({ name }) => name === 'Site')
          addMessage(`Site type...${!hasSite ? '⛔️ Not' : '✅'} Found`)
          if (hasSite) {
            ReactGA.event({
              category: 'Setup',
              action: 'Complete Step 1'
            })
            addMessage('Redirecting to next step...', <Redirect push to='/__tutorial/graphcms/step-2' />)
          }
          ReactGA.event({
            category: 'Setup',
            action: 'Failed Step 1'
          })
        } else if (step === 2) {
          const { parseTypes, schemaIssues } = require('../../../site/schema')
          addMessage(`Parsing schema...`)
          const parsedTypes = parseTypes(types)
          const issues = schemaIssues(parsedTypes)
          const siteIssues = issues && (issues.find(({ model }) => model === 'Site') || {}).issues

          if (siteIssues) {
            for (const { fieldName, issue, ...data } of siteIssues) {
              if (issue === 'Missing field') {
                addMessage(`⛔️ Missing field: ${fieldName}`)
              } else if (issue === 'Bad type') {
                addMessage(`⛔️ Incorrect field type: ${fieldName} —\n  Required type: "${data.requiredType}"\n  Found type: "${data.fieldType}"`)
              } else {
                addMessage(`⛔ ${issue}: ${fieldName}`)
              }
              ReactGA.event({
                category: 'Setup',
                action: 'Failed Step 2 - ' + issue,
                label: `Field Name: ${fieldName}`
              })
            }
            addMessage(`⛔️ Check failed — Could not proceed.`, <a href='#log-issues' onClick={e => console.table(siteIssues) || e.preventDefault()}>Log discrepencies to console</a>)
            ReactGA.event({
              category: 'Setup',
              action: 'Failed Step 2'
            })
          } else {
            addMessage(`✅ All checks have passed.`)
            addMessage('Redirecting to next step...', <Redirect push to='/__tutorial/graphcms/step-3' />)
            ReactGA.event({
              category: 'Setup',
              action: 'Complete Step 2'
            })
          }
        } else if (step === 3) {
          const { parseTypes, schemaIssues } = require('../../../site/schema')
          addMessage(`Parsing schema...`)
          const parsedTypes = parseTypes(types)
          const issues = schemaIssues(parsedTypes)
          const pageIssues = issues && (issues.find(({ model }) => model === 'Page') || {}).issues
          console.log(`⛔️ issues`, issues)

          if (pageIssues) {
            for (const { fieldName, issue, ...data } of pageIssues) {
              if (issue === 'Missing field') {
                addMessage(`⛔️ Missing field: ${fieldName}`)
              } else if (issue === 'Bad type') {
                addMessage(`⛔️ Incorrect field type: ${fieldName} —\n  Required type: "${data.requiredType}"\n  Found type: "${data.fieldType}"`)
              } else {
                addMessage(`⛔ ${issue}: ${fieldName}`)
              }
              ReactGA.event({
                category: 'Setup',
                action: 'Failed Step 3 - ' + issue,
                label: `Field Name: ${fieldName}`
              })
            }
            addMessage(`⛔️ Check failed — Could not proceed.`, <a href='#log-discrepencies' onClick={e =>
              console.group('Graze') ||
              console.table(pageIssues) ||
              console.log('Parsed types:', parsedTypes) ||
              console.log('Parsed Page:', parsedTypes['Page']) ||
              console.groupEnd() ||
              e.preventDefault()}>Log discrepencies to console</a>)
            ReactGA.event({
              category: 'Setup',
              action: 'Failed Step 3'
            })
          } else {
            addMessage(`✅ All checks have passed.`)
            addMessage('Redirecting to next step...', <Redirect push to='/__tutorial/graphcms/page-attributes' />)
            ReactGA.event({
              category: 'Setup',
              action: 'Complete Step 3'
            })
            ReactGA.event({
              category: 'Setup',
              action: 'Complete'
            })
          }
        }
      })
    } else {
      // As plain site pages
      if (step === 1) {
        addMessage('Redirecting to next step...',
          <Redirect push to='/__tutorial/graphcms/step-2' />)
        ReactGA.event({
          category: 'Tutorial',
          action: 'Continue to Step 2'
        })
      } else if (step === 2) {
        addMessage('Redirecting to page-attributes...',
          <Redirect push to='/__tutorial/graphcms/step-3' />)
        ReactGA.event({
          category: 'Tutorial',
          action: 'Continue to Step 3'
        })
      } else if (step === 3) {
        addMessage('Redirecting to tutorial index...',
          <Redirect push to='/__tutorial/graphcms/page-attributes' />)
        ReactGA.event({
          category: 'Tutorial',
          action: 'Continue to Step page-attributes'
        })
      }
    }
  }
  // console.log('what is GA?', ReactGA)
  // Local console
  useEffect(() => {
    const logs = messages
      // Calculate diff
      .map((msg, i) => (i < messages.length - 1 ? { ...msg, diff: msg.time - (messages[i + 1]).time } : msg))
      
      // Setup stats
      .map(el => {
        const logres = ReactGA.event({
          category: 'Setup',
          action: 'Log Item',
          value: el.message
        })
        console.log('should log...', logres)
        return el
      })

      // Render log item
      .map((msg, i) => (
        <LogItem key={`log item ${i}`}>
          {msg.payload && (
            <span className='payload w100 dib center ph3 pv2'>
              {msg.payload}
            </span>
          )}
          <span className='message'>{msg.message}</span>
          <span className='time avenir'>{dayjs(msg.time).format('HH:mm:ss:SSS')} {msg.diff ? `+${msg.diff}ms` : ''}</span>
        </LogItem>
      ))

    setLog(logs)
  }, [messages])

  const Body = content[step - 1].body

  return (
    <ArticleFullBleed
      art={content[step - 1].art}
      title={content[step - 1].title}
      subtitle={content[step - 1].subtitle}
    >
      <Body />
      <div className='avenir measure mt2 tr'>
        <button onClick={() => check()} className='f6 link br2 ph3 pv2 mb2 dib white bg-blue shadow grow pointer'>Next</button>
      </div>
      {log && !!log.length && (
        <pre>
          {log}
        </pre>
      )}
    </ArticleFullBleed>
  )
}

const LogItem = styled.div`
  display: flex;
  flex-direction: column;
  font-size: .75rem;
  &:not(:last-of-type) {
    margin-bottom: .5rem;
  }
  .time {
    font-size: .5rem;
  }
  .message {
    font-size: .75rem;
  }
`

const RequiredFieldsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  li {
    margin: 0;
    padding: 0;
    &:not(:last-of-type) {
      margin-bottom: .75rem;
    }
    label {
      font-size: 1.2rem;
    }
    code {
      font-size: 0.9rem;
    }
  }
`

const content = [
  { // Step 1
    art: require('./images/graphcms-art.png'),
    title: 'Step 1: Create "Site" Model',
    subtitle: 'Graze GraphCMS Setup Tutorial',
    body: props => (
      <React.Fragment>
        <p className='times lh-copy measure f4 mt0'>
          If you're starting up from a new GraphCMS setup head on
          to the <code>Schema</code> section and click on the little
          plus sign next to Models.
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/schema-page.png')} alt='Schema Page' />
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/new-model.png')} alt='New Model' />
        </p>
        <p className='times lh-copy measure f4 mt0'>
          Navigate to GraphCMS Schema section and under models create
          a new model with name and app id <code>Site</code>.
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/create-site.png')} alt='Site Model' />
        </p>
      </React.Fragment>
    )
  },
  { // Step 2
    art: require('./images/page.png'),
    title: 'Step 2: Add Fields',
    subtitle: 'Graze GraphCMS Setup Tutorial',
    body: props => (
      <React.Fragment>
        <p className='times lh-copy measure f4 mt0'>
          In order to be able to control the site we're
          going to add a few fields to the Site model. The fields
          we're going to add are <code>Name</code>, <code>Description</code>,
          and <code>Content</code>.
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/add-site-fields.png')} alt='Add site fields' />
        </p>
        <p className='times lh-copy measure f4 mt0'>
          Click the 'Fields' tab - it's on the right side of the screen.
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/add-fields.png')} alt='Add site fields' />
        </p>
        <p className='times lh-copy measure f4 mt0'>
          Drag the <code>Single line text</code> towards
          the fields area. In the dialog that opens fill in <code>Name</code> for
          'Display Name', and <code>name</code> for 'Api id'.
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/add-name-field.gif')} alt='Add site fields' />
        </p>
        <p>
          Expand the "<span role='img' aria-label='Down'>🔽</span> Advanced" tab to show the advanced options for the field,
          and turn on <code>Make field required</code> and <code>Make field unique</code>.
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/site-name.png')} alt='Add site fields' />
        </p>
        <p className='times lh-copy measure f4 mt0'>
          Add another <code>Single line text</code> named <code>Description</code>, and
          add <code>Markdown</code> named <code>Content</code>.
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/description-and-content.gif')} alt='Add site fields' />
        </p>
      </React.Fragment>
    )
  },
  { // Step 3
    art: require('./images/page.png'),
    title: 'Step 3: Create "Page" Model',
    subtitle: 'Graze GraphCMS Setup Tutorial',
    body: props => (
      <React.Fragment>
        <p className='times lh-copy measure f4 mt0'>
          Now we're going to add another model, named <code>Page</code>.
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/create-page-model.png')} alt='Page Model' />
        </p>
        <p className='times lh-copy measure f4 mt0'>
          And let's add a few fields:
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/page-model.gif')} alt='Page Model' />
        </p>
        <RequiredFieldsList>
          <li><label className='dib w-100 avenir'>Title</label> <code>#title</code>, <code>String</code>, <code>Single line text</code></li>
          <li><label className='dib w-100 avenir'>Description</label> <code>#description</code>, <code>String</code>, <code>Markdown</code></li>
          <li><label className='dib w-100 avenir'>Content</label> <code>#content</code>, <code>String</code>, <code>Markdown</code></li>
          <li><label className='dib w-100 avenir'>Slug</label> <code>#slug</code>, <code>String</code>, <code>Single line text</code>, <code>Required</code>, <code>Unique</code></li>
        </RequiredFieldsList>
        <p className='times lh-copy measure f4 mt0'>
          You should have something similar to this for a Page model:
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/page-model.png')} alt='Page Model' />
        </p>
        <p className='times lh-copy measure f4 mt0'>
          The next step is to add our first reference! <span role='img' aria-label='party'>🎊🎉</span>
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/reference.png')} alt='Page Model - Index field' />
        </p>
        <p className='times lh-copy measure f4 mt0'>
          We'll be adding the index reference for sites, so that your
          app knows what page to open when landing on the root URL.
          Creating a refence is tricky at first, but try it on a
          few models and you'll be getting the hang of it in a jiffy.
        </p>
        <p className='times lh-copy measure f4 mt0'>
          So let's add that reference to our fields, and when the reference
          view shows fill it as follows.
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/reference-relation.png')} alt='Reference Relationship' />
        </p>
        <p className='times lh-copy measure f4 mt0'>
          In the center there's a relationship picker (ikr?), you want to go
          a head and pick the <code>One to many relation</code> option.
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/reference-one-to-many.png')} alt='Reference Relationship' />
        </p>
        <p className='times lh-copy measure f4 mt0'>
          On the right side, where it says "Select Model <span role='img' aria-label='Down'>🔽</span>", you're going to pick "Site"
          and fill the details as follows:
        </p>
        <RequiredFieldsList>
          <li><label className='dib w-100 avenir'>Display Name</label> <code>Index</code></li>
          <li><label className='dib w-100 avenir'>API ID</label> <code>index</code></li>
        </RequiredFieldsList>
        <p className='times lh-copy measure f4 mt0'>
          On the left side where it says "Page" input the following:
        </p>
        <RequiredFieldsList>
          <li><label className='dib w-100 avenir'>Display Name</label> <code>Graze Index</code></li>
          <li><label className='dib w-100 avenir'>API ID</label> <code>grazeIndex</code></li>
        </RequiredFieldsList>

        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/page-index.png')} alt='Page Model - Index field' />
        </p>
        <p className='times lh-copy measure f4 mt0'>
          Now that you've added the last link in the chain, continue
          by adding some content to your page and hooking up to some React
          magic.
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/page-graze-index.png')} alt='Page Model - Index field' />
        </p>
        <p className='times lh-copy measure f4 mt0'>
          Let's finish this step by adding one more reference between our
          Site and Page models so that our site can have other pages and
          wont be limited only to the Index page.
        </p>

        <p className='times lh-copy measure f4 mt0'>
          Drag another "Reference" to your Page model and follow
          the details below.
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/reference.png')} alt='Page Model - Index field' />
        </p>

        <p className='times lh-copy measure f4 mt0'>
          In the left pane set "Display Name" to <code>Graze Sites</code>, and "App ID" <code>grazeSites</code>,
          in the center select <code>Many to many relation</code>. In the right side select
          "Site", and set "Display Name" to <code>Graze Pages</code>, and "App ID" to <code>grazePages</code>.
        </p>
        <p className='times lh-copy measure f4 mt0'>
          <img src={require('./images/graze-pages.png')} alt='Page Model - Index field' />
        </p>
        <p className='times lh-copy measure f4 mt0'>
          You can start adding pages to your site!
        </p>
      </React.Fragment>
    )
  }
]
