import React from 'react'
import { Link } from 'react-router-dom'

export const PagesAndMedia = props => {
  const ArticleFullBleed = require('components/articles/full-bleed').default
  return (
    <ArticleFullBleed
      art={require('../images/upload-media.png')}
      title={'Adding Pages and Media'}
      subtitle={'Graze GraphCMS Advanced Tutorial'}
    >
      <p className='times lh-copy measure f4 mt0'>
        Let's add pages to our Graze site - navigate to the "Content"
        section in GraphCMS, go to Pages and click on "<span role='img' aria-label='Plus'>➕</span> Create Page".
      </p>
      <p className='times lh-copy measure f4 mt0'>
        <img src={require('../images/content-pages.png')} alt='Create Features page' />
      </p>
      <p className='times lh-copy measure f4 mt0'>
        Fil in the details as follows; the key values are the "Slug"
        that you want to set to <code>features</code>, and the content
        format as displayed here.
      </p>
      <h5>Title</h5>
      <p className='times lh-copy measure f4 mt0'>
        <code>Features</code>
      </p>
      <h5>Description</h5>
      <p className='times lh-copy measure f4 mt0'>
        <code>Graze features page</code>
      </p>
      <pre className='lh-copy measure f4 mt0'>{`
---
features:
 - title: Fast
   slug: /features/fast
   subtitle: "Graze is fast, really fast!
By using Server-Side Rendering the entire
web application, once bound to the client alone,
is compiled and rendered on the server in record time!"
   art: https://media.graphcms.com/resize=w:294/output=format:png/L8IvndLYSfmTHF3f1UxL
 - title: Easy
   slug: /features/easy
   subtitle: "Starting up with Graze is super simple
and requires only a couple of commands from
first keystroke to fully deployed and active web app."
   art: https://media.graphcms.com/resize=w:294/output=format:png/ayt7vcYS2SmWIwhnXkI4
 - title: Modern
   slug: /features/modern
   subtitle: "Get cranking using the modern tools
that enable us to do so much more. Use the framework
of your choice and enjoy sub-second rendering with full
SSR support."
   art: https://media.graphcms.com/resize=w:294/output=format:png/OW0XXobYQiymUhEoKc6s
---

Welcome to features! Start exploring by changing the components to your liking!
`}</pre>
      <h5>Slug</h5>
      <p className='times lh-copy measure f4 mt0'>
        <code>features</code>
      </p>
      <p className='times lh-copy measure f4 mt0'>
        <img src={require('../images/create-features-page.png')} alt='Create Features page' />
      </p>
      <p className='times lh-copy measure f4 mt0'>
        A word on the media functionality - to upload images
        simply click on the image button in the content editor
        and upload/connect your files.
      </p>
      <p className='times lh-copy measure f4 mt0'>
        <img src={require('../images/adding-media.png')} alt='Create Features page' />
      </p>
      <p className='times lh-copy measure f4 mt0'>
        The automatic insertion will add the filename in the editor,
        like so: <code>![graze+graphcms.png](https://media.graphcms.com/output=format:jpg/L8IvndLYSfmTHF3f1UxL)</code>
        but our <code>Article</code> component will expect
        a simple URL to display the images correctly, so we'll
        strip the meta data and leave only the url.
      </p>
      <p className='times lh-copy measure f4 mt0'>
        <img src={require('../images/upload-media.png')} alt='Create Features page' />
      </p>
      <p className='times lh-copy measure f4 mt0'>
        You might notice that I've slighty modified the URLs and
        all the images have <code>resize=w:294</code> directive —
        this tells the GraphCMS api to resize the images according
        the defined width. Go <a href='https://docs.graphcms.com/developers/assets/transformations/resize-fit-and-align'>check
        out the API</a> to learn more about their transformation directives.
      </p>
      <p className='times lh-copy measure f4 mt0'>
        <img src={require('../images/connect-graze-sites.png')} alt='Connect Graze Sites' />
      </p>
      <p className='times lh-copy measure f4 mt0'>
        Next click on "Connect Sites" in the "Graze Sites" section,
        and link the root site created in the previous tutorial.
      </p>
      <p className='times lh-copy measure f4 mt0'>
        In the window that pops open you should be able to see the site
        you've created, and if you hover on the status columm in the site's
        row you'll see the <span role='img' aria-label='Chain link'>🔗</span> link button appearing.
      </p>
      <p className='times lh-copy measure f4 mt0'>
        <img src={require('../images/select-sites.png')} alt='Connect Graze Sites' />
      </p>
      <p className='times lh-copy measure f4 mt0'>
        <img src={require('../images/link-site.png')} alt='Connect Graze Sites' />
      </p>
      <p className='times lh-copy measure f4 mt0'>
        Click the <span role='img' aria-label='Chain Link'>🔗</span> link button. Now switch the "Draft <span role='img' aria-label='Down'>🔽</span>" to "Published",
        and click "Save <span role='img' aria-label='Down'>🔽</span>". Now after refreshing the page you should be seeing
        a new link in the top navigation.
      </p>
      <p className='times lh-copy measure f4 mt0'>
        <img src={require('../images/graze-features.png')} alt='Graze Features Page' />
      </p>
      <p className='times lh-copy measure f4 mt0'>
        If all worked well you should be able to navigate
        to <Link to='/features'>Features</Link> page now
        and see the three features we've added.
      </p>
      <div className='avenir measure mt2 tr'>
        <Link to='/__tutorial' className='f6 link br2 ph3 pv2 mb2 dib white bg-blue shadow grow pointer'>Back to Tutorials</Link>
      </div>
    </ArticleFullBleed>
  )
}

export default PagesAndMedia
