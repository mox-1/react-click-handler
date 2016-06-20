# react-click-handler
#### A React component that helps assign and remove focus to components based on click events.

Often, it is necessary to apply styling rules to a page based on where the user has clicked. React-click-handler can be used to wrap any component and track the ‘focus’ of any of its child components, by setting a corresponding variable on it’s state at the exclusion of other tracked components.

For example:

```jsx
const pageClickSelectors = [
    {
        selector: '#first-component',
        focusState: 'firstComponentFocussed',
        toggle: true,
        sideEffect: false
    },
    {
        selector: '#second-component',
        focusState: 'secondComponentFocussed',
        toggle: false,
        sideEffect: false
    }
];

<ReactClickHandler
    wrapperClass={'page-wrapper'}
    parentState={this.state}
    setParentState={this.setState}
    selectors={pageClickSelectors}
>
    <div id={‘first-component’} className={this.state.firstComponentFocussed && 'open'}></div>
    <div id='second-component' className={this.state.secondComponentFocussed && 'open'}></div>
</ReactClickHandler>
```

Clicking on the first div will set its corresponding focus state variable to **true** and ensure that the second div's focus state variable is **false**.

#### PageClickSelectors

In addition to a classname to apply to the wrapper, and the state and setState methods of your parent component, this wrapper component expects to receive an array of selector objects of the form:
```javascript
{
    selector: // a STRING representing, in CSS selector syntax, the element we want to attach a focus handler on
    focusState: // a STRING indicating the state property that deals with this elements focus
    toggle: // a BOOLEAN indicating whether this element toggles focus, or just sets it
    sideEffect: // an optional FUNCTION to be called when this element is clicked
}
```

When a click event occurs, this component calls the given handlers for the selector that is **closest** in the DOM tree to the event source.
The associated focus property on the parent state (boolean) is either toggled or set to **true**.
All other focus properties on the page are set to **false**.