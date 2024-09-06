/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import Collapse from '@mui/material/Collapse'; // Animation Collapse từ Material-UI
import Fade from '@mui/material/Fade'; // Animation Fade từ Material-UI
import Box from '@mui/material/Box'; // Thành phần Box từ Material-UI
import Grow from '@mui/material/Grow'; // Animation Grow từ Material-UI
import Slide from '@mui/material/Slide'; // Animation Slide từ Material-UI
import Zoom from '@mui/material/Zoom'; // Animation Zoom từ Material-UI

// ==============================|| TRANSITIONS COMPONENT ||============================== //

/*
  Component Transitions dùng để điều khiển các hiệu ứng chuyển tiếp (transition) khác nhau 
  (grow, fade, collapse, slide, zoom) khi hiển thị hoặc ẩn đi phần tử con (children) của nó.
  
  Props:
  - children: phần tử con được bao bọc bởi hiệu ứng chuyển tiếp.
  - position: xác định vị trí xuất phát của hiệu ứng (ví dụ: top-left, top-right, bottom, etc.).
  - type: loại hiệu ứng chuyển tiếp (grow, fade, collapse, slide, zoom).
  - direction: hướng chuyển tiếp (up, down, left, right) chỉ dành cho hiệu ứng 'slide'.
  - others: các thuộc tính khác được truyền vào như timeout cho các hiệu ứng.

  React.forwardRef: Được sử dụng để chuyển tiếp ref đến component Box bên trong, điều này hữu ích
  khi cần truy cập vào DOM element từ bên ngoài.
*/

const Transitions = React.forwardRef(({ children, position, type, direction, ...others }, ref) => {
  // Xác định vị trí xuất phát của hiệu ứng chuyển tiếp dựa trên prop 'position'
  let positionSX = {
    transformOrigin: '0 0 0' // Giá trị mặc định cho transformOrigin
  };

  // Thiết lập vị trí cho các trường hợp khác nhau
  switch (position) {
    case 'top-right':
      positionSX = {
        transformOrigin: 'top right'
      };
      break;
    case 'top':
      positionSX = {
        transformOrigin: 'top'
      };
      break;
    case 'bottom-left':
      positionSX = {
        transformOrigin: 'bottom left'
      };
      break;
    case 'bottom-right':
      positionSX = {
        transformOrigin: 'bottom right'
      };
      break;
    case 'bottom':
      positionSX = {
        transformOrigin: 'bottom'
      };
      break;
    case 'top-left':
    default:
      positionSX = {
        transformOrigin: '0 0 0' // Giá trị mặc định cho 'top-left'
      };
      break;
  }

  // Trả về JSX cho component với các loại hiệu ứng khác nhau dựa trên prop 'type'
  return (
    <Box ref={ref}>
      {/* Hiệu ứng Grow */}
      {type === 'grow' && (
        <Grow {...others}>
          <Box sx={positionSX}>{children}</Box>
        </Grow>
      )}
      {/* Hiệu ứng Collapse */}
      {type === 'collapse' && (
        <Collapse {...others} sx={positionSX}>
          {children}
        </Collapse>
      )}
      {/* Hiệu ứng Fade */}
      {type === 'fade' && (
        <Fade
          {...others}
          timeout={{
            appear: 500, // Thời gian xuất hiện hiệu ứng
            enter: 600, // Thời gian khi vào
            exit: 400 // Thời gian khi thoát
          }}
        >
          <Box sx={positionSX}>{children}</Box>
        </Fade>
      )}
      {/* Hiệu ứng Slide */}
      {type === 'slide' && (
        <Slide
          {...others}
          timeout={{
            appear: 0, // Không có thời gian khi xuất hiện
            enter: 400, // Thời gian vào
            exit: 200 // Thời gian thoát
          }}
          direction={direction} // Hướng của hiệu ứng slide
        >
          <Box sx={positionSX}>{children}</Box>
        </Slide>
      )}
      {/* Hiệu ứng Zoom */}
      {type === 'zoom' && (
        <Zoom {...others}>
          <Box sx={positionSX}>{children}</Box>
        </Zoom>
      )}
    </Box>
  );
});

// PropTypes để đảm bảo kiểu dữ liệu của các prop truyền vào
Transitions.propTypes = {
  children: PropTypes.node, // children là các phần tử con trong component
  type: PropTypes.oneOf(['grow', 'fade', 'collapse', 'slide', 'zoom']), // Xác định loại hiệu ứng
  position: PropTypes.oneOf(['top-left', 'top-right', 'top', 'bottom-left', 'bottom-right', 'bottom']), // Vị trí xuất phát của hiệu ứng
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']) // Hướng của hiệu ứng chỉ dành cho 'slide'
};

// Giá trị mặc định cho các prop nếu không được truyền vào
Transitions.defaultProps = {
  type: 'grow', // Mặc định sử dụng hiệu ứng 'grow'
  position: 'top-left', // Mặc định xuất phát từ 'top-left'
  direction: 'up' // Mặc định hướng là 'up' cho hiệu ứng slide
};

export default Transitions;
