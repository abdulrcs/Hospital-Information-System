import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  OrderedList,
  ListItem,
} from '@chakra-ui/react'

export default function CustomModal({ isOpen, onClose, title, data }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent py={4}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <OrderedList>
            {data
              ? data.registrant.map(e => <ListItem key={e}>{e}</ListItem>)
              : ''}
          </OrderedList>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
