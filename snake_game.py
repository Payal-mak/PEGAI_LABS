import pygame
import random
import sys

pygame.init()

WIDTH, HEIGHT = 600, 400
BLOCK = 20
FPS = 10

GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Snake Game")

clock = pygame.time.Clock()
font = pygame.font.SysFont(None, 30)


def draw_snake(snake):
    for block in snake:
        pygame.draw.rect(screen, GREEN, (block[0], block[1], BLOCK, BLOCK))


def message(text, color, y):
    msg = font.render(text, True, color)
    screen.blit(msg, (WIDTH // 2 - msg.get_width() // 2, y))


def game():
    snake = [[100, 100]]
    dx = BLOCK
    dy = 0

    food = [
        random.randrange(0, WIDTH, BLOCK),
        random.randrange(0, HEIGHT, BLOCK),
    ]

    score = 0

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT and dx == 0:
                    dx = -BLOCK
                    dy = 0
                elif event.key == pygame.K_RIGHT and dx == 0:
                    dx = BLOCK
                    dy = 0
                elif event.key == pygame.K_UP and dy == 0:
                    dx = 0
                    dy = -BLOCK
                elif event.key == pygame.K_DOWN and dy == 0:
                    dx = 0
                    dy = BLOCK

        head = [snake[0][0] + dx, snake[0][1] + dy]

        if (
            head[0] < 0
            or head[0] >= WIDTH
            or head[1] < 0
            or head[1] >= HEIGHT
            or head in snake
        ):
            break

        snake.insert(0, head)

        if head == food:
            score += 1
            food = [
                random.randrange(0, WIDTH, BLOCK),
                random.randrange(0, HEIGHT, BLOCK),
            ]
        else:
            snake.pop()

        screen.fill(BLACK)

        pygame.draw.rect(screen, RED, (food[0], food[1], BLOCK, BLOCK))
        draw_snake(snake)

        score_text = font.render(f"Score: {score}", True, WHITE)
        screen.blit(score_text, (10, 10))

        pygame.display.update()
        clock.tick(FPS)

    screen.fill(BLACK)
    message("Game Over", RED, 150)
    message(f"Final Score: {score}", WHITE, 190)
    pygame.display.update()
    pygame.time.wait(3000)


game()