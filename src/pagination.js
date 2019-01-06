import query from 'component-query'
import closest from 'component-closest'
import matches from 'component-matches-selector'
import stylesheet from './stylesheet.css'

/**
 * constants
 */
const DEFAULT_OPTIONS = {
  previousText: 'PREVIOUS',
  nextText: 'NEXT',
}
const CONTAINER_CLASSNAME = 'docsify-pagination-container'

/**
 * basic utilities
 */
function toArray (elements) {
  return Array.prototype.slice.call(elements)
}
function isALinkTo (path, element) {
  if (arguments.length === 1) {
    return (element) => isALinkTo(path, element)
  }
  return decodeURIComponent(element.getAttribute('href').split('?')[0]).replace('#', '') === decodeURIComponent(path)
}


/**
 * core renderer
 */
class Link {
  constructor (element) {
    if (!element) {
      return
    }
    this.hyperlink = element
  }
  toJSON () {
    if (!this.hyperlink) {
      return
    }
    return {
      name: this.hyperlink.getAttribute("data-text") || this.hyperlink.innerHTML,
      href: this.hyperlink.getAttribute('href'),
    }
  }
}

function pagination (vm) {
  try {
    const path = vm.route.path
    const all = toArray(query.all('.sidebar li a')).filter((element) => !matches(element, '.section-link'))
    const index = all.findIndex(isALinkTo(path))
    return {
      prev: new Link(query('a[data-prev]') || all[index - 1]).toJSON(),
      next: new Link(query('a[data-next]') || all[index + 1]).toJSON(),
    }
  } catch (error) {
    return {}
  }
}

const template = {
  container () {
    return `<div class="${CONTAINER_CLASSNAME}"></div>`
  },

  inner (data, options) {
    return [
      data.prev && `
        <div class="pagination-item pagination-item--previous">
          <a href="${data.prev.href}">
            <div class="pagination-item-label">
              <svg class="icon" width="10" height="16" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
                <polyline fill="none" vector-effect="non-scaling-stroke" points="8,2 2,8 8,14"/>
              </svg>
              <span>${options.previousText}</span>
            </div>
            <div class="pagination-item-title">${data.prev.name}</div>
          </a>
        </div>
      `,
      data.next && `
        <div class="pagination-item pagination-item--next">
          <a href="${data.next.href}">
            <div class="pagination-item-label">
              <span>${options.nextText}</span>
              <svg width="10" height="16" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
                <polyline fill="none" vector-effect="non-scaling-stroke" points="2,2 8,8 2,14"/>
              </svg>
            </div>
            <div class="pagination-item-title">${data.next.name}</div>
          </a>
        </div>
      `
    ].filter(Boolean).join('')
  },
}

/**
 * installation
 */
export function install (hook, vm) {
  let options = Object.assign({}, DEFAULT_OPTIONS, vm.config.pagination || {})

  function render () {
    const container = query(`.${CONTAINER_CLASSNAME}`)
    if (!container) {
      return
    }
    container.innerHTML = template.inner(pagination(vm), options)
  }

  hook.afterEach((html) => html + template.container())
  hook.doneEach(() => render())
}
