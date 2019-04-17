import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Hey! Welcome to Graze.
// This tutorial, besides explaining how to setup GraphCMS,
// also works as an example of a completely static site.

// There's something quite beautiful what has happened with
// Javascript, HTML, and CSS; using React and some Styled
// Components we're left with a rather redable composition
// of the three.

// Regardless of your appreciation or there lack of for HTML
// and CSS in JS you can also `import './some-css-file.css`
// or even `import './some-css-file.scss` for SASS files.

// Enjoy hacking with Graze! 🍓

export default props => {
  const { default: GraphCMSTutorial } = require('./graphcms')
  const { url } = props.match || { url: '__tutorial' }
  return (
    <Switch>
      <Route path={[`${url}`, `/__tutorial`]} exact render={p => <TutorialIndex {...p} data={props.data} />} />
      <Route path={[`${url}/graphcms`, `/__tutorial/graphcms`]} render={p => <GraphCMSTutorial {...p} data={props.data} />} />
      <Route path={'/'}><Redirect push to={`/__tutorial${props.types ? '/graphcms' : ''}`} /></Route>
    </Switch>
  )
}

const TutorialIndex = props => {
  const { default: Page } = require('../../components/page')
  const { default: PageCover } = require('../../components/page-cover')
  const { default: ArticlesList, Article } = require('../../components/articles/list')

  return (
    <Page>
      <PageCover
        bgColor='dark-blue'
        pitch={{
          title: 'Graze Knowledgebase',
          subtitle: 'Start building awesome apps with GraphCMS and Razzle'
        }}
        art={<img src={require('./tutorial-art.png')} alt='Tutorial Art' />}
      />
      <ArticlesList title='Graze Tutorials' className='mt5'>
        <Article
          slug='/__tutorial/graphcms'
          art={require('./graphcms/images/graphcms-art.png')}
          title='Setup GraphCMS'
          subtitle='First steps with GraphCMS and Graze - Setup the basic models and get started hacking your site'
        />
        <Article
          slug='/__tutorial/graphcms/step-2'
          art={require('./graphcms/images/add-fields.png')}
          title='Adding Fields'
          subtitle={(
            <React.Fragment>
              In order to be able to control the site we're
              going to add a few fields to the Site model. The fields
              we're going to add are <code>Name</code>, <code>Description</code>,
              and <code>Content</code>
            </React.Fragment>
          )}
        />
        <Article
          slug='/__tutorial/graphcms/step-3'
          art={require('./graphcms/images/page-index.png')}
          title='Creating References'
          subtitle={(
            <React.Fragment>
              We'll be adding the index reference for sites, so that your
              app knows what page to open when landing on the root URL.
              Creating a refence is tricky at first
            </React.Fragment>
          )}
        />
        <Article
          slug='/__tutorial/graphcms/page-attributes'
          art={require('./graphcms/images/create-and-link-root.png')}
          title='Page Attributes and Section'
          subtitle={(
            <React.Fragment>
              A page's content is a markdown field, and Graze treats it
              as a Front Matter document, superchargin what you can
              with just a few keystrokes and a clever arrangement of
              React components
            </React.Fragment>
          )}
        />
        <Article
          slug='/__tutorial/graphcms/pages-and-media'
          art={require('./graphcms/images/upload-media.png')}
          title='Pages and Media'
          subtitle={(
            <React.Fragment>
              Discover how to add pages to your site and embed media
              right from GraphCMS
            </React.Fragment>
          )}
        />
      </ArticlesList>
    </Page>
  )
}
