# react-click-handler
#### A React component that helps assign and remove focus to components based on click events.

This component expects to receive an array of selector objects of the form:
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