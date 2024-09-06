/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import React from 'react';

// third-party library
import { motion, useCycle } from 'framer-motion'; // Thư viện Framer Motion dùng để tạo animation

// ==============================|| ANIMATION BUTTON COMPONENT ||============================== //

/*
  Component AnimateButton tạo hiệu ứng hoạt ảnh khi người dùng tương tác với nút.
  Nó hỗ trợ các loại hiệu ứng: 
  - 'rotate': Xoay vòng tròn.
  - 'slide': Trượt theo hướng xác định.
  - 'scale': Phóng to/thu nhỏ khi hover hoặc click.
  
  Props:
  - children: các phần tử con bên trong nút.
  - type: loại hiệu ứng được áp dụng (rotate, slide, scale).
  - direction: hướng trượt (chỉ dành cho hiệu ứng slide).
  - offset: khoảng cách trượt của nút (chỉ dành cho hiệu ứng slide).
  - scale: tỷ lệ phóng to/thu nhỏ cho hiệu ứng scale.
  - ref: dùng để tham chiếu tới phần tử DOM từ bên ngoài component.
*/

const AnimateButton = React.forwardRef(({ children, type, direction, offset, scale }, ref) => {
  // Xác định giá trị khởi đầu (offset1) và giá trị khi hover (offset2) cho hiệu ứng slide dựa trên 'direction'
  let offset1;
  let offset2;

  switch (direction) {
    case 'up':
    case 'left':
      // Nếu hướng là 'up' hoặc 'left', offset1 sẽ là giá trị của 'offset' và offset2 là 0
      offset1 = offset;
      offset2 = 0;
      break;
    case 'right':
    case 'down':
    default:
      // Nếu hướng là 'right' hoặc 'down', offset1 là 0 và offset2 là giá trị của 'offset'
      offset1 = 0;
      offset2 = offset;
      break;
  }

  // Sử dụng hook 'useCycle' từ framer-motion để chuyển đổi giá trị khi hover
  const [x, cycleX] = useCycle(offset1, offset2); // Quản lý giá trị trượt theo trục X
  const [y, cycleY] = useCycle(offset1, offset2); // Quản lý giá trị trượt theo trục Y

  // Kiểm tra loại hiệu ứng được truyền vào thông qua prop 'type'
  switch (type) {
    // Hiệu ứng xoay vòng tròn 360 độ
    case 'rotate':
      return (
        <motion.div
          ref={ref}
          animate={{ rotate: 360 }} // Animation xoay 360 độ
          transition={{
            repeat: Infinity, // Lặp lại vô hạn
            repeatType: 'loop', // Kiểu lặp: quay vòng liên tục
            duration: 2, // Thời gian hoàn thành 1 vòng xoay là 2 giây
            repeatDelay: 0 // Không có độ trễ giữa các vòng lặp
          }}
        >
          {children} {/* Nội dung bên trong nút */}
        </motion.div>
      );

    // Hiệu ứng trượt theo hướng (slide)
    case 'slide':
      if (direction === 'up' || direction === 'down') {
        return (
          <motion.div
            ref={ref}
            animate={{ y: y !== undefined ? y : '' }} // Animation trượt theo trục Y
            onHoverEnd={() => cycleY()} // Khi hover kết thúc, thay đổi giá trị Y
            onHoverStart={() => cycleY()} // Khi hover bắt đầu, thay đổi giá trị Y
          >
            {children}
          </motion.div>
        );
      }
      // Trường hợp trượt theo trục X
      return (
        <motion.div
          ref={ref}
          animate={{ x: x !== undefined ? x : '' }} // Animation trượt theo trục X
          onHoverEnd={() => cycleX()} // Khi hover kết thúc, thay đổi giá trị X
          onHoverStart={() => cycleX()} // Khi hover bắt đầu, thay đổi giá trị X
        >
          {children}
        </motion.div>
      );

    // Hiệu ứng phóng to/thu nhỏ (scale)
    case 'scale':
    default:
      if (typeof scale === 'number') {
        // Nếu 'scale' là một số, ta chuyển đổi nó thành object với giá trị cho hover và tap
        scale = {
          hover: scale,
          tap: scale
        };
      }
      return (
        <motion.div
          ref={ref}
          whileHover={{ scale: scale?.hover }} // Phóng to khi hover
          whileTap={{ scale: scale?.tap }} // Thu nhỏ khi click (tap)
        >
          {children}
        </motion.div>
      );
  }
});

// Kiểm tra kiểu dữ liệu của các props
AnimateButton.propTypes = {
  children: PropTypes.node, // Phần tử con bên trong nút (có thể là văn bản, biểu tượng, v.v.)
  offset: PropTypes.number, // Khoảng cách trượt khi dùng hiệu ứng 'slide'
  type: PropTypes.oneOf(['slide', 'scale', 'rotate']), // Loại hiệu ứng (slide, scale, rotate)
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']), // Hướng trượt (dành cho hiệu ứng 'slide')
  scale: PropTypes.oneOfType([PropTypes.number, PropTypes.object]) // Giá trị scale (có thể là số hoặc object)
};

// Giá trị mặc định cho các props
AnimateButton.defaultProps = {
  type: 'scale', // Mặc định là hiệu ứng 'scale'
  offset: 10, // Khoảng cách trượt mặc định là 10
  direction: 'right', // Mặc định trượt theo hướng 'right'
  scale: {
    hover: 1, // Tỷ lệ khi hover mặc định là 1 (giữ nguyên kích thước)
    tap: 0.9 // Tỷ lệ khi click mặc định là 0.9 (thu nhỏ 10%)
  }
};

export default AnimateButton;
