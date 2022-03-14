/** @jsxImportSource @emotion/react */
import * as React from 'react'

const styles: {
  [key: string]: React.CSSProperties | Record<string, React.CSSProperties>
} = {
  top: {
    width: '100%',
    height: '10px',
    top: '0px',
    left: '0px',
    cursor: 'row-resize',
    background: '#ffffff',
  },
  right: {
    width: '16px',
    height: '100%',
    top: '0px',
    right: '0px',
    cursor: 'col-resize',
    background: 'rgba(0,0,0,0.25)',
    borderRadius: '0 6px 6px 0',
  },
  bottom: {
    width: '100%',
    height: '10px',
    bottom: '0px',
    left: '0px',
    cursor: 'row-resize',
    background: '#ffffff',
  },
  left: {
    width: '16px',
    height: '100%',
    top: '0px',
    left: '0px',
    cursor: 'col-resize',
    background: 'rgba(0,0,0,0.25)',
    borderRadius: '6px 0 0 6px',
  },
  topRight: {
    width: '15px',
    height: '15px',
    position: 'absolute',
    right: '-0px',
    top: '-0px',
    cursor: 'ne-resize',
    background: 'rgba(0,0,0,0)',
  },
  bottomRight: {
    width: '15px',
    height: '15px',
    position: 'absolute',
    right: '-0px',
    bottom: '-0px',
    cursor: 'se-resize',
    background: 'rgba(0,0,0,0)',
  },
  bottomLeft: {
    width: '15px',
    height: '15px',
    position: 'absolute',
    left: '0px',
    bottom: '0px',
    cursor: 'sw-resize',
    // background: "red",
  },
  topLeft: {
    width: '15px',
    height: '15px',
    position: 'absolute',
    left: '0px',
    top: '0px',
    cursor: 'nw-resize',
    // background: "red",
  },
}

export type Direction =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft'

export type OnStartCallback = (
  e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  dir: Direction
) => void

export interface Props {
  direction: Direction
  className?: string
  replaceStyles?: React.CSSProperties
  onResizeStart: OnStartCallback
  children: React.ReactNode
  isResizing: boolean
  isResizingDir: Direction
}

export class Resizer extends React.PureComponent<Props> {
  onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.props.onResizeStart(e, this.props.direction)
  }

  onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    this.props.onResizeStart(e, this.props.direction)
  }

  render() {
    return (
      <div
        className={this.props.className || ''}
        css={{
          position: 'absolute',
          userSelect: 'none',
          ...styles[this.props.direction],
          ...(this.props.replaceStyles || {}),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
      >
        {this.props.children}
      </div>
    )
  }
}
