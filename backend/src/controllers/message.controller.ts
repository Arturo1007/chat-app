import { Request, Response } from "express"
import prisma from "../db/prisma";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    // Receiver id.
    const { id: receiverId } = req.params;
    // current user id.
    const senderId = req.userId;
    // Data validation.
    if (!senderId || !receiverId) {
      return res.status(400).json({ error: 'Sender or receiver ID is missing' });
    }
    // Check if a conversation already exists.
    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId]
        },
      }
    })

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId]
          }
        }
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id,
      }
    });

    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            }
          }
        }
      })
    }

    res.status(201).json({ newMessage });

  } catch (error: any) {
    console.log('Error in SendMessage controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const userID = req.userId;

    // Data validation.
    if (!userID) {
      return res.status(400).json({ error: 'Id parameter missing' });
    }

    if (!userToChatId) {
      console.log('Error in getMessaage controller, {userToChatId} variable is missing');
      return res.status(400).json({ error: 'Internal Server Error' });
    }

    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [userID, userToChatId],
        }
      },
      include: {
        messages: {
          orderBy: {
            createAt: 'asc'
          }
        }
      }
    })

    if (!conversation) {
      return res.status(200).json([]);
    }

    return res.status(200).json(conversation.messages);

  } catch (error: any) {
    console.log('Error in getMessaage controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getCurrentUserSidebarConversations = async (req: Request, res: Response) => {
  try {
    const authUserId = req.userId;
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUserId,
        }
      },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      }
    })
    res.status(200).json(users);
  } catch (error: any) {
    console.log('Error in getCurrentUserSidebarConversations controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
