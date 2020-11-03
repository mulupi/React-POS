import React, { useEffect } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownToggle,
} from '@coreui/react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { DataGrid } from '@material-ui/data-grid';
import {
  connect,
  useSelector
} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Cart = props => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  // const items = useSelector(state => state.cart.items)
  const { items } = props
  const [number, setNumber] = React.useState(0)

  useEffect(() => {
    console.log(items.length)
    setNumber(items.length)
  }, [items])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Cart</h2>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          columns={
            [{ field: 'product_name', width: 150 },
            { field: 'product_description', width: 150 },
            { field: 'Price_per_unit', width: 100, type: 'number' },
            ]
          }
          rows={items}
        />
      </div>
    </div>
  );



  return (
    <div>
      <CDropdown
        inNav
        className="c-header-nav-item mx-2"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false} onClick={handleOpen}>
          <FontAwesomeIcon icon={faShoppingCart} />
          <CBadge shape="pill" color="danger">{number}</CBadge>
        </CDropdownToggle>

      </CDropdown>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}

const getItems = state => state.cart.items

const mapStateToProps = (state, ownProps) => {
  return {
    items: getItems(state)
  }
}

export default connect(
  mapStateToProps,
)(Cart)