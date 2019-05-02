import React from 'react'
import { Link } from 'react-router-dom'

const PageAttributes = props => {
  const ArticleFullBleed = require('components/articles/full-bleed').default
  return (
    <ArticleFullBleed
      art={require('../images/graphcms-art.png')}
      title={'Setting up page attributes and sections'}
      subtitle={'Graze GraphCMS Advanced Tutorial'}
    >
      <p className='times lh-copy measure f4 mt0'>
        Congrats on finishing the basic setup! <span role='img' aria-label='Kiwi'>🥝</span>
      </p>
      <p className='times lh-copy measure f4 mt0'>
        You can now start hacking with your own prebaked setup by hooking
        the right components to the right queries, or you can follow along
        with this part of the tutorial that will give you the tools to
        really push the limits of what your apps can do.
      </p>
      <p className='times lh-copy measure f4 mt0'>
        First you want to make sure that your API end-point is publicly
        accessible if you haven't done so already before proceeding any
        further. You'll find the toggle in the "Project Settings" section
        of your GraphCMS project.
      </p>
      <p className='times lh-copy measure f4 mt0'>
        <img src={require('../images/protected-api.png')} alt='Schema Page' />
      </p>
      <p className='times lh-copy measure f4 mt0'>
        Set the "Public API Permissions"'s <code>Scope</code> to <code>Query</code>,
        and click "Update".
      </p>
      <p className='times lh-copy measure f4 mt0'>
        <img src={require('../images/public-api.png')} alt='Schema Page' />
      </p>
      <h3>Front Matter & Markdown</h3>
      <p className='times lh-copy measure f4 mt0'>
        A page's content is a markdown field, and Graze treats it as
        a <a to='https://jekyllrb.com/docs/front-matter/'>Front Matter</a> document,
        meaning the start of the markdown document can contain
        additional information wrapped in <code>---</code>, like so;
      </p>
      <pre>{`
---
sections:
 - page-cover:
    bgColor: light-blue
    art: https://media.graphcms.com/output=format:png/L8IvndLYSfmTHF3f1UxL
    pitch:
      title: My Super Awesome Cover Title!
      subtitle: Start Building Now!
---

Welcome to Graze Homepage
`}
      </pre>
      <p className='times lh-copy measure f4 mt0'>
        A word of caution here — YAML is all about the whitespaces,
        so make sure to format your YAML document accordingly to avoid
        nasty surprizes.
      </p>
      <p className='times lh-copy measure f4 mt0'>
        A malformed YAML document will hang the request
        while in SSR if not handled correctly.
      </p>
      <h4>Attributes & Sections</h4>
      <p className='times lh-copy measure f4 mt0'>
        We use the Front Matter YAML document ability to communicate
        to Graze what kind of content we want to show and how. The
        Front Matter content is split in to two; Attributes, and Body.
      </p>
      <p className='times lh-copy measure f4 mt0'>
        The Body, the markdown string without the YAML Front Matter, is
        rendered using <code>react-markdown</code>, while the attributes
        passed as part of the <code>PageContext</code>.
      </p>
      <p className='times lh-copy measure f4 mt0'>
        The attribute <code>sections</code> is special - it's an array
        of elements each should contain one item containing a key/value
        pair. The key is used to load the component, and the value is an
        object itself containing key/value pairs.
      </p>
      <p className='times lh-copy measure f4 mt0'>
        Each key in the <code>sections</code> attribute is passed
        to a <code>require</code> function, loading modules from the <code>src/components</code>
        directory, and passing the value object as properties to the component.
      </p>
      <p className='times lh-copy measure f4 mt0'>
        Let's create the first page and site; Head on to the content
        section in your GraphCMS project, and if you've followed along
        the tutorial so far, you should have at least 2 models, Page,
        and Site.
      </p>
      <p className='times lh-copy measure f4 mt0'>
        <img src={require('../images/new-page-content.png')} alt='Schema Page' />
      </p>
      <p className='times lh-copy measure f4 mt0'>
        Click on the "<span role='img' aria-label='Plus'>➕</span> Create Page" and fill in the details as follows:
      </p>
      <h5>Title</h5>
      <pre className='lh-copy measure f4 mt0'>My Page Title</pre>
      <h5>Slug</h5>
      <pre className='lh-copy measure f4 mt0'>index</pre>
      <h5>Content</h5>
      <pre className='lh-copy measure f4 mt0'>{`
---
sections:
 - page-cover:
    bgColor: light-blue
    art: https://media.graphcms.com/output=format:png/L8IvndLYSfmTHF3f1UxL
    pitch:
      title: My Super Awesome Cover Title!
      subtitle: Start Building Now!
---

  Welcome to Graze Homepage
`}</pre>
      <p className='times lh-copy measure f4 mt0'>
        <img src={require('../images/create-homepage.png')} alt='Schema Page' />
      </p>
      <p className='times lh-copy measure f4 mt0'>
        Before saving make sure to switch from "Draft <span role='img' aria-label='Down'>🔽</span>" to "Published", and
        once all the details are filled in hit "Save <span role='img' aria-label='Down'>🔽</span>".
      </p>
      <p className='times lh-copy measure f4 mt0'>
        <img src={require('../images/save-draft-published.png')} alt='Save Published Page' />
      </p>
      <p className='times lh-copy measure f4 mt0'>
        Once saved, scroll down to the <code>Index</code> field and click
        on "Create Site"
      </p>
      <p className='times lh-copy measure f4 mt0'>
        <img src={require('../images/graze-index-create-site.png')} alt='Create Site' />
      </p>
      <p className='times lh-copy measure f4 mt0'>
        Name your new site <code>root</code>, and you can fill the rest as you
        like. Once complete, click on the "Draft <span role='img' aria-label='Down'>🔽</span>" and change it to "Published",
        and the click on "Create and Link <span role='img' aria-label='Down'>🔽</span>" button to save your work.
      </p>
      <p className='times lh-copy measure f4 mt0'>
        <img src={require('../images/create-and-link-root.png')} alt='Create Site' />
      </p>
      <p className='times lh-copy measure f4 mt0'>
        Now that your site was created and linked, click on "Save <span role='img' aria-label='Down'>🔽</span>" for the
        Page that you've just edited, and... marvel the fruits of your labor
        on the <Link to='/'>front page</Link>.
      </p>
      <div className='avenir measure mt2 tr'>
        <Link to='/__tutorial/graphcms/pages-and-media' className='f6 link br2 ph3 pv2 mb2 dib white bg-blue shadow grow pointer'>Pages and Media</Link>
      </div>
    </ArticleFullBleed>
  )
}

export default PageAttributes
