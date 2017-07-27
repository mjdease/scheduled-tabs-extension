import React from 'react';

import './nested-component.scss';

export default function Nested() {
  return (
    <div className="nested-component">
      <h2>Nested Component</h2>
      <p>
        This is an example of a nested component that was imported via
        import / export syntax.
      </p>
    </div>
  );
}
